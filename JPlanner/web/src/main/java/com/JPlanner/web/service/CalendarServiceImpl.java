package com.JPlanner.web.service;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.JPlanner.web.dao.CalendarDao;
import com.JPlanner.web.domain.schedule.Schedule;
import com.JPlanner.web.dto.InsertScheduleDto;
import com.JPlanner.web.dto.UpdateScheduleDto;

@Service
public class CalendarServiceImpl implements CalendarService {
	
	@Autowired
	private CalendarDao calendarDao;

	@Override
	public Map<Integer, List<Schedule>> selectSchedules(List<Integer> dates, int id) {
		
		List<Schedule> schedules = calendarDao.selectSchedulesByDates(dates, id);
		Map<Integer, List<Schedule>> scheduleMap = new HashMap<Integer, List<Schedule>>();
		
		for(int i=0; i<dates.size(); i++) {
			
			int date = dates.get(i);
			List<Schedule> schedulesEachDay = new LinkedList<Schedule>();
			
			for(int j=0; j<schedules.size(); j++) {
				Schedule schedule = new Schedule();
				schedule.setId(schedules.get(j).getId());
				schedule.setTitle(schedules.get(j).getTitle());
				schedule.setDescription(schedules.get(j).getDescription());
				schedule.setStartDate(schedules.get(j).getStartDate());
				schedule.setEndDate(schedules.get(j).getEndDate());
				
				int startDate = Integer.parseInt(schedule.getStartDate().toLocalDate().toString().replace("-", ""));
				int endDate = Integer.parseInt(schedule.getEndDate().toLocalDate().toString().replace("-", ""));
				
				if(date >= startDate && date <= endDate) {
					
					if(endDate - startDate == 0) {
						schedule.setOneday(true);
						
					} else if(date == startDate) {
						schedule.setFirstday(true);
						
					} else if(date == endDate) {
						schedule.setLastday(true);
						
					} else if(date > startDate && date < endDate){
						schedule.setMiddleday(true);
					}
					schedule.setRowNum(-1);
					schedulesEachDay.add(schedule);
				}
			}
			
			if(schedulesEachDay.size() != 0) {
				// set rowNum if td must be had blank set id -1 and it will be <span> at jsp
				List<Schedule> prevSchedules = null;
				
				if(i == 0) {
					// firstDayinCalendar // sort 1. schedule_length 2. id // rowNum starts 0
					for(int j=0; j<schedulesEachDay.size(); j++) {
						schedulesEachDay.get(j).setRowNum(j);
					}
					scheduleMap.put(date, schedulesEachDay);
				} else {
					prevSchedules = scheduleMap.get(dates.get(i-1));
					
					if(prevSchedules.size() == 0) {
						// lastDay has no schedule
						for(int j=0; j<schedulesEachDay.size(); j++) {
							schedulesEachDay.get(j).setRowNum(j);
						}
						scheduleMap.put(date, schedulesEachDay);
						
					} else {
						// lastDay has schedule at least 1
						List<Schedule> schedulesWithDays = new ArrayList<Schedule>();
						
						for(int j=0; j<prevSchedules.size(); j++) {
							
							Schedule prevSchedule = prevSchedules.get(j);
							if(prevSchedule.getId() == -1) {
								continue; // 당일 일정
							}
							int startDate = Integer.parseInt(prevSchedule.getStartDate().toLocalDate().toString().replace("-", ""));
							int endDate = Integer.parseInt(prevSchedule.getEndDate().toLocalDate().toString().replace("-", ""));
							if(endDate - startDate > 0) {
								schedulesWithDays.add(prevSchedule);
							}
						}
						if(schedulesWithDays.size() == 0) {
							// lastDay has no schedule over 1 day
							for(int j=0; j<schedulesEachDay.size(); j++) {
								schedulesEachDay.get(j).setRowNum(j);
							}
							scheduleMap.put(date, schedulesEachDay);
						} else {
							
							List<Schedule> matchedSchedules = new ArrayList<Schedule>();
							int maxRow = 0;
							
							for(int j=0; j<schedulesWithDays.size(); j++) {
								Schedule lastSchedule = schedulesWithDays.get(j);
								
								for(int k=0; k<schedulesEachDay.size(); k++) {
									
									if(lastSchedule.getId() == schedulesEachDay.get(k).getId()) {
										schedulesEachDay.get(k).setRowNum(lastSchedule.getRowNum());
										
										if(lastSchedule.getRowNum() >= maxRow) {
											maxRow = lastSchedule.getRowNum() + 1;
										}
										break;
									}
								}
							} // copy rowNum to presentSchedules
							
							if(schedulesEachDay.size() > maxRow) {
								maxRow = schedulesEachDay.size();
							}
							
							for(int j=0; j<maxRow; j++) {
								boolean rowNumFound = false;

								for(int m=0; m<schedulesEachDay.size(); m++) {
									if(schedulesEachDay.get(m).getRowNum() == j) {
										matchedSchedules.add(schedulesEachDay.get(m));
										schedulesEachDay.remove(m);
										rowNumFound = true;
										break;
									}
								}
								if(rowNumFound == true) {
									continue;
								}
								rowNumFound = false;
								
								for(int m=0; m<schedulesEachDay.size(); m++) {
									if(schedulesEachDay.get(m).getRowNum() == -1) {
										schedulesEachDay.get(m).setRowNum(j);
										matchedSchedules.add(schedulesEachDay.get(m));
										schedulesEachDay.remove(m);
										rowNumFound = true;
										break;
									}
								}
								if(rowNumFound == true) {
									continue;
								}
								Schedule span = new Schedule();
								span.setId(-1);
								span.setRowNum(j);
								matchedSchedules.add(span);
							}
							scheduleMap.put(date, matchedSchedules);
						}
					}
				}
			} else {
				scheduleMap.put(date, schedulesEachDay);
			}
		}
		return scheduleMap;
	}
	
	@Override
	public List<Integer> selectAllDates(int yearmonth) {
		// return Integer 'yyyymmdd' format
		
		List<Integer> dates = new ArrayList<Integer>();
		
		int preYear = yearmonth / 100;
		int preMonth = yearmonth % 100;
		int lastYear = preYear;
		int lastMonth = preMonth - 1;
		int nextYear = preYear;
		int nextMonth = preMonth + 1;
		int preDay = 1;
		
		if(lastMonth == 0) {
			lastYear--;
			lastMonth = 12;
		}
		
		if(nextMonth == 13) {
			nextYear++;
			nextMonth = 1;
		}
		
		LocalDateTime firstDay = LocalDateTime.of(preYear, preMonth, 1, 0, 0);
		int firstDayWeekday = firstDay.getDayOfWeek().getValue();
		int lastDatInPreMonth = YearMonth.of(preYear, preMonth).lengthOfMonth();
		
		int lastDayInLastMonth = YearMonth.of(lastYear, lastMonth).lengthOfMonth();
		int firstDayCalendar = lastDayInLastMonth - firstDayWeekday + 1;
		
		int firstDayInNextMonth = 1;
		
		int i = 0;
		
		while(i < 42) {
			
			if(i < 8) {
				if(firstDayWeekday == 7) {
					dates.add(preYear * 10_000 + preMonth * 100 + preDay);
					preDay++;
					firstDayWeekday++;
					firstDayCalendar = lastDayInLastMonth + 1;
					
				} else if(firstDayCalendar < lastDayInLastMonth + 1){
					dates.add(lastYear * 10_000 + lastMonth * 100 + firstDayCalendar);
					firstDayCalendar++;
					
				} else {
					dates.add(preYear * 10_000 + preMonth * 100 + preDay);
					preDay++;
				}
			} else if(preDay > lastDatInPreMonth) {
				dates.add(nextYear * 10_000 + nextMonth * 100 + firstDayInNextMonth);
				firstDayInNextMonth++;
				
			} else {
				dates.add(preYear * 10_000 + preMonth * 100 + preDay);
				preDay++;
				
			}
			
			i++;
		}
		
		return dates;
	}
	
	@Override
	public Schedule getSchedule(int scheduleId) {
		
		return calendarDao.getScheduleById(scheduleId);
	}
	
	@Override
	public List<Schedule> getScheduleList(int yearmonth, int userId) {
		
		return calendarDao.getScheduleListByYearMonth(yearmonth, userId);
	}
	
	@Override
	public int insertCommonSchedule(InsertScheduleDto insertScheduleDto, int userId) {
		
		Schedule schedule = insertScheduleDto.toEntity();

		int result = calendarDao.insertScheduleBySchedule(schedule, userId);
		
		return result;
	}
	
	@Override
	public Schedule insertTourSchedule(InsertScheduleDto insertScheduleDto, int userId) {
		
		Schedule schedule = insertScheduleDto.toEntity();

		int result = calendarDao.insertScheduleBySchedule(schedule, userId);
		
		if(result == 1) {
			Schedule insertedSchedule = calendarDao.getScheduleBySchedule(schedule, userId);
			System.out.println(insertedSchedule);
			
			return insertedSchedule;
		}
		
		return null;
	}
	
	@Override
	public int updateCommonSchedule(UpdateScheduleDto updateScheduleDto, int userId) {

		Schedule schedule = updateScheduleDto.toEntity();

		int result = calendarDao.updateScheduleBySchedule(schedule, userId);
		
		return result;
	}
	
	@Override
	public Schedule updateTourSchedule(UpdateScheduleDto updateScheduleDto, int userId) {

		Schedule schedule = updateScheduleDto.toEntity();

		int result = calendarDao.updateScheduleBySchedule(schedule, userId);
		
		if(result == 1) {
			Schedule updatedSchedule = calendarDao.getScheduleById(schedule.getId());
			
			return updatedSchedule;
		}
		
		return null;
	}
	
	@Override
	public int deleteSchedule(int scheduleId) {

		int result = calendarDao.deleteScheduleById(scheduleId);
		
		return result;
	}
}
