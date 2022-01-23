package com.jun.web.service;

import java.util.List;

import com.jun.web.domain.schedule.Schedule;

public interface CalendarService {

	public List<Schedule> selectSchedules(int id);
	public List<Integer> selectAllDates(int yearmonth);
}
