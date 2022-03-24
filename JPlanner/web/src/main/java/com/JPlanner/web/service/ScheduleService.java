package com.JPlanner.web.service;

import java.util.List;
import java.util.Map;

import com.JPlanner.web.entity.schedule.Schedule;
import com.JPlanner.web.requestDto.InsertScheduleReqDto;
import com.JPlanner.web.requestDto.UpdateScheduleReqDto;

public interface ScheduleService {

	public Map<Integer, List<Schedule>> selectSchedules(List<Integer> dates, int userId);
	public List<Integer> selectAllDates(int yearmonth);
	
	public List<Schedule> getScheduleList(int yearmonth, int userId);
	
	public Schedule getSchedule(int scheduleId);
	
	public int insertCommonSchedule(InsertScheduleReqDto insertScheduleDto, int userId);
	public Schedule insertTourSchedule(InsertScheduleReqDto insertScheduleDto, int userId);
	public int updateCommonSchedule(UpdateScheduleReqDto updateScheduleDto, int userId);
	public Schedule updateTourSchedule(UpdateScheduleReqDto updateScheduleDto, int userId);
	public int deleteSchedule(int scheduleId);
}
