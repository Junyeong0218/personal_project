package com.jun.web.service;

import java.util.List;
import java.util.Map;

import com.jun.web.domain.schedule.Schedule;

public interface CalendarService {

	public Map<Integer, List<Schedule>> selectSchedules(List<Integer> dates, int id);
	public List<Integer> selectAllDates(int yearmonth);
	
	public Schedule getSchedule(int id);
}
