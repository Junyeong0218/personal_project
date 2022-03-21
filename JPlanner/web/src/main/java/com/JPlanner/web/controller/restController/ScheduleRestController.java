package com.JPlanner.web.controller.restController;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.JPlanner.web.domain.schedule.Schedule;
import com.JPlanner.web.domain.user.User;
import com.JPlanner.web.dto.InsertScheduleDto;
import com.JPlanner.web.dto.MainCalendarResDto;
import com.JPlanner.web.dto.UpdateScheduleDto;
import com.JPlanner.web.service.CalendarService;

@RestController
@RequestMapping("/user/")
public class ScheduleRestController {
	
	@Autowired
	private CalendarService calendarService;
	
	@PostMapping("getCalendar")
	public MainCalendarResDto getCalendar(int ym, HttpServletRequest request) {
		if(ym == 0) {
			ym = LocalDateTime.now().getYear() * 100 + LocalDateTime.now().getMonthValue();
		}
		
		User user = (User) request.getSession().getAttribute("user");
		
		List<Integer> dates = calendarService.selectAllDates(ym);
		Map<Integer, List<Schedule>> schedules = calendarService.selectSchedules(dates, user.getId());
		
		MainCalendarResDto mainCalendarResDto = new MainCalendarResDto(dates, schedules);
		
		return mainCalendarResDto;
	}
	
	@PostMapping("getSchedule")
	public Schedule getSchedule(int scheduleId) {
		
		Schedule schedule = calendarService.getSchedule(scheduleId);
		
		return schedule;
		
	}
	
	@PostMapping("getScheduleList")
	public List<Schedule> getScheduleList(int ym, HttpServletRequest request) {
		
		User user = (User) request.getSession().getAttribute("user");
		
		List<Schedule> scheduleList = calendarService.getScheduleList(ym, user.getId());
		
		return scheduleList;
		
	}
	
	@PostMapping("insertCommonSchedule")
	public int insertCommonSchedule(InsertScheduleDto insertScheduleDto, HttpServletRequest request) {
		
		if(insertScheduleDto.getDescription() == null || insertScheduleDto.getDescription().equals("")) {
			insertScheduleDto.setDescription(insertScheduleDto.getTitle());
		}
		
		User user = (User) request.getSession().getAttribute("user");
		
		int result = calendarService.insertCommonSchedule(insertScheduleDto, user.getId());
		
		return result;
	}
	
	@PostMapping("insertTourSchedule")
	public Schedule insertTourSchedule(InsertScheduleDto insertScheduleDto, HttpServletRequest request) {
		
		if(insertScheduleDto.getDescription() == null || insertScheduleDto.getDescription().equals("")) {
			insertScheduleDto.setDescription(insertScheduleDto.getTitle());
		}
		
		User user = (User) request.getSession().getAttribute("user");
		
		Schedule insertedSchedule = calendarService.insertTourSchedule(insertScheduleDto, user.getId());
		
		return insertedSchedule;
	}

	@PostMapping("updateCommonSchedule")
	public int updateCommonSchedule(UpdateScheduleDto updateScheduleDto, HttpServletRequest request) {
		
		if(updateScheduleDto.getDescription() == null || updateScheduleDto.getDescription().equals("")) {
			updateScheduleDto.setDescription(updateScheduleDto.getTitle());
		}
		
		User user = (User) request.getSession().getAttribute("user");
		
		int result = calendarService.updateCommonSchedule(updateScheduleDto, user.getId());
		
		return result;
	}
	
	@PostMapping("updateTourSchedule")
	public Schedule updateTourSchedule(UpdateScheduleDto updateScheduleDto, HttpServletRequest request) {
		
		if(updateScheduleDto.getDescription() == null || updateScheduleDto.getDescription().equals("")) {
			updateScheduleDto.setDescription(updateScheduleDto.getTitle());
		}
		System.out.println(updateScheduleDto);
		
		User user = (User) request.getSession().getAttribute("user");
		
		Schedule updatedSchedule = calendarService.updateTourSchedule(updateScheduleDto, user.getId());
		
		return updatedSchedule;
	}
	
	@PostMapping("deleteSchedule")
	public int deleteSchedule(int scheduleId, HttpServletRequest request) throws IOException {
		
		int result = calendarService.deleteSchedule(scheduleId);
		
		return result;
	}

}
