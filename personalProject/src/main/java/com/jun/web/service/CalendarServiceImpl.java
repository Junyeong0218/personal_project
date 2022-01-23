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
		
		int year = yearmonth / 100;
		int month = yearmonth % 100;
		int lastyear = year;
		int lastmonth = month - 1;
		
		if(lastmonth == 0) {
			lastyear--;
			lastmonth = 12;
		}
		
		LocalDateTime firstDay = LocalDateTime.of(year, month, 1, 0, 0);
		int weekday = firstDay.getDayOfWeek().getValue();
		
		YearMonth.of(lastyear, lastmonth).lengthOfMonth();
		
		return dates;
	}
}
