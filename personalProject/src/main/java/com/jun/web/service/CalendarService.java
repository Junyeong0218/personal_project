package com.jun.web.service;

import java.util.List;
import java.util.Map;

import com.jun.web.domain.schedule.Schedule;
import com.jun.web.dto.InsertScheduleDto;
import com.jun.web.dto.UpdateScheduleDto;

public interface CalendarService {

	public Map<Integer, List<Schedule>> selectSchedules(List<Integer> dates, int id);
	public List<Integer> selectAllDates(int yearmonth);
	
	public Schedule getSchedule(int id);
	
	public int insertSchedule(InsertScheduleDto insertScheduleDto, int userId);
	public int updateSchedule(UpdateScheduleDto updateScheduleDto, int userId);
}
