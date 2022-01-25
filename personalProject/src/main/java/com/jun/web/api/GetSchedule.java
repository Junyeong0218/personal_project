package com.jun.web.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jun.web.domain.schedule.Schedule;
import com.jun.web.service.CalendarService;

@RestController
@RequestMapping("/user/")
public class GetSchedule {
	
	@Autowired
	private CalendarService calendarService;
	
	@PostMapping("getSchedule")
	public Schedule getSchedule(@RequestParam int id) {
		
		Schedule schedule = calendarService.getSchedule(id);
		
		System.out.println(schedule);
		
		return schedule;
		
	}

}
