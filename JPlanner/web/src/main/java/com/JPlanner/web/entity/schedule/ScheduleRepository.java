package com.JPlanner.web.entity.schedule;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ScheduleRepository {
	
	public List<Schedule> selectSchedulesByDates(ScheduleOneMonth scheduleOneMonth);
	
	public Schedule getScheduleById(int scheduleId);
	public Schedule getScheduleBySchedule(Schedule schedule);
	
	public List<Schedule> getScheduleListByYearMonth(int yearmonth, int userId);
	
	public int insertScheduleBySchedule(Schedule schedule);
	public int updateScheduleBySchedule(Schedule schedule);
	public int deleteScheduleById(int scheduleId);
}
