package com.JPlanner.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {
	
	private static String INDEX = "index";
	private static String MAIN = "main";
	private static String SIGNUP = "signup";
	private static String USERINFO = "user/userInfo";
	private static String CHECK_PASSWORD = "user/checkPassword";
	
	@GetMapping("/main")
	public String main() {
		return MAIN;
	}
	
	@GetMapping("/signup")
	public String signup() {
		return SIGNUP;
	}
	
	@GetMapping("/user/checkPassword")
	public String checkPassWord() {
		return CHECK_PASSWORD;
	}
	
	@GetMapping("/user/userInfo")
	public String userInfo() {
		return USERINFO;
	}

	@RequestMapping("/index")
	public String index() {
		
		return INDEX;
	}
	
}
