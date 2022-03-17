package com.JPlanner.web.controller;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MapController {

	@GetMapping("maps")
	public String maps(String start, String end, String days, int id) {
		
		LocalDateTime startDate = new Timestamp(Long.parseLong(start)).toLocalDateTime();
		LocalDateTime endDate = new Timestamp(Long.parseLong(end)).toLocalDateTime();
		
		return "maps/maps";
	}
}
