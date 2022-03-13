package com.jun.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class HomeController {
	
	private final String INDEX_URL = "index";
	
	@GetMapping("index")
	public String index() {
		
		return INDEX_URL;
	}
	
	@GetMapping()
	public String forIndex() {
		
		return INDEX_URL;
	}

}