package com.jun.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class MainController {

	private final String MAIN_URL = "main";
	
	@GetMapping("main")
	public String main() {
		
		return MAIN_URL;
	}
}
