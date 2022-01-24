package com.jun.web.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.MonthDay;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.jun.web.domain.schedule.Schedule;

@Service
public class CalendarServiceImpl implements CalendarService {

	@Override
	public List<Schedule> selectSchedules(int id) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public List<Integer> selectAllDates(int yearmonth) {
		
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
		
		int lastDayInLastMonth = YearMonth.of(lastYear, lastMonth).lengthOfMonth();
		int firstDayCalendar = lastDayInLastMonth - firstDayWeekday + 1;
		
		int i = 0;
		
		while(i < 35) {
			
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
			} else {
				
			}
			
			i++;
		}
		
		
		
		return dates;
	}
}
