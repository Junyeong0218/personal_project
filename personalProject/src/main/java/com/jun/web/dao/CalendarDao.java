package com.jun.web.dao;

import java.util.List;

import com.jun.web.domain.schedule.Schedule;
import com.jun.web.dto.InsertScheduleDto;

public interface CalendarDao {
	
	public List<Schedule> selectSchedulesByDates(List<Integer> dates, int userId);
	
	public Schedule getScheduleById(int scheduleId);
	
	public List<Schedule> getScheduleListByYearMonth(int yearmonth, int userId);
	
	public int insertScheduleBySchedule(Schedule schedule, int userId);
	public int updateScheduleBySchedule(Schedule schedule, int userId);
	public int deleteScheduleById(int scheduleId);
}
