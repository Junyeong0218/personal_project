package com.jun.web.api;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.jun.web.domain.schedule.Schedule;
import com.jun.web.domain.user.User;
import com.jun.web.dto.InsertScheduleDto;
import com.jun.web.dto.UpdateScheduleDto;
import com.jun.web.service.CalendarService;

@RestController
@RequestMapping("/user/")
public class ApiSchedule {
	
	@Autowired
	private CalendarService calendarService;
	
	@PostMapping("getSchedule")
	@ResponseBody
	public Schedule getSchedule(@RequestParam int scheduleId) {
		
		Schedule schedule = calendarService.getSchedule(scheduleId);
		
		System.out.println(schedule);
		
		return schedule;
		
	}
	
	@PostMapping("instSchedule")
	@ResponseBody
	public void instSchedule(@ModelAttribute InsertScheduleDto insertScheduleDto,
							HttpServletRequest request,
							HttpServletResponse response) throws IOException {
		
		if(insertScheduleDto.getDescription() == null || insertScheduleDto.getDescription().equals("")) {
			insertScheduleDto.setDescription(insertScheduleDto.getTitle());
		}
		
		User user = (User) request.getSession().getAttribute("user");
		
		int result = calendarService.insertSchedule(insertScheduleDto, user.getId());
		
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.println("{\"result\": " + result + "}");
		out.close();
		
	}
	
	@PostMapping("updateSchedule")
	@ResponseBody
	public void updateSchedule(@ModelAttribute UpdateScheduleDto updateScheduleDto,
								HttpServletRequest request,
								HttpServletResponse response) throws IOException {
		
		if(updateScheduleDto.getDescription() == null || updateScheduleDto.getDescription().equals("")) {
			updateScheduleDto.setDescription(updateScheduleDto.getTitle());
		}
		
		System.out.println(updateScheduleDto);
		
		User user = (User) request.getSession().getAttribute("user");
		
		int result = calendarService.updateSchedule(updateScheduleDto, user.getId());
		
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.println("{\"result\": " + result + "}");
		out.close();
		
	}

}
