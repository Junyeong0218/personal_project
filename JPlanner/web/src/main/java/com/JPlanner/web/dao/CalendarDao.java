package com.JPlanner.web.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.JPlanner.web.domain.schedule.Schedule;
import com.JPlanner.web.dto.InsertScheduleDto;

@Repository
public interface CalendarDao {
	
	public List<Schedule> selectSchedulesByDates(List<Integer> dates, int userId);
	
	public Schedule getScheduleById(int scheduleId);
	public Schedule getScheduleBySchedule(Schedule schedule, int userId);
	
	public List<Schedule> getScheduleListByYearMonth(int yearmonth, int userId);
	
	public int insertScheduleBySchedule(Schedule schedule, int userId);
	public int updateScheduleBySchedule(Schedule schedule, int userId);
	public int deleteScheduleById(int scheduleId);
}
