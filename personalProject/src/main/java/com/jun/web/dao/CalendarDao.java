package com.jun.web.dao;

import java.util.List;

import com.jun.web.domain.schedule.Schedule;

public interface CalendarDao {
	
	public List<Schedule> selectSchedulesByDates(List<Integer> dates, int id);
	
	public Schedule getScheduleById(int id);
}
