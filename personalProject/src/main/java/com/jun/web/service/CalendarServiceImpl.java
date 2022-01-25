package com.jun.web.service;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jun.web.dao.CalendarDao;
import com.jun.web.domain.schedule.Schedule;

@Service
public class CalendarServiceImpl implements CalendarService {
	
	@Autowired
	private CalendarDao calendarDao;

	@Override
	public Map<Integer, List<Schedule>> selectSchedules(List<Integer> dates, int id) {
		
		List<Schedule> schedules = calendarDao.selectSchedulesByDates(dates, id);
		
		Map<Integer, List<Schedule>> scheduleMap = new HashMap<Integer, List<Schedule>>();
		
		for(int date : dates) {
			//2022 01 25
			List<Schedule> schedulesEachDay = new LinkedList<Schedule>();
			for(int i=0; i<schedules.size(); i++) {
				// s 2022 01 24 e 2022 01 26
				
				Schedule schedule = schedules.get(i);
				int startDate = Integer.parseInt(schedule.getStartDate().toLocalDate().toString().replace("-", ""));
				int endDate = Integer.parseInt(schedule.getEndDate().toLocalDate().toString().replace("-", ""));
				
				if(date >= startDate && date <= endDate) {
					
					if(endDate - startDate == 0) {
						schedule.setOneday(true);
						schedulesEachDay.add(schedule);
					} else if(date == startDate) {
						schedule.setFirstday(true);
						schedulesEachDay.add(schedule);
					} else if(date == endDate) {
						schedule.setLastday(true);
						schedulesEachDay.add(schedule);
					} else if(date > startDate && date < endDate){
						schedule.setMiddleday(true);
						schedulesEachDay.add(schedule);
					}
					
				}
				
			}
			
			System.out.println(date);
			System.out.println(schedulesEachDay);
			
			scheduleMap.put(date, schedulesEachDay);
			
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
			
			if(i < 7) {
				if(firstDayWeekday == 7) {
					dates.add(preYear * 10_000 + preMonth * 100 + preDay);
					preDay++;
					firstDayWeekday = lastDayInLastMonth + 1;
					
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
	public Schedule getSchedule(int id) {
		
		return calendarDao.getScheduleById(id);
	}
}
