package com.JPlanner.web.service;

import java.util.List;
import java.util.Map;

import com.JPlanner.web.domain.schedule.Schedule;
import com.JPlanner.web.dto.InsertScheduleDto;
import com.JPlanner.web.dto.UpdateScheduleDto;

public interface CalendarService {

	public Map<Integer, List<Schedule>> selectSchedules(List<Integer> dates, int id);
	public List<Integer> selectAllDates(int yearmonth);
	
	public List<Schedule> getScheduleList(int yearmonth, int userId);
	
	public Schedule getSchedule(int scheduleId);
	
	public int insertSchedule(InsertScheduleDto insertScheduleDto, int userId);
	public int updateSchedule(UpdateScheduleDto updateScheduleDto, int userId);
	public int deleteSchedule(int scheduleId);
}
