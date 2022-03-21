package com.JPlanner.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MapController {

	@GetMapping("maps")
	public String maps(int days, int id) {
		
		return "maps/maps";
	}
}
