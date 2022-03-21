package com.JPlanner.web.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.JPlanner.web.domain.schedule.Schedule;
import com.JPlanner.web.domain.user.User;
import com.JPlanner.web.service.CalendarService;

@Controller
@RequestMapping("/")
public class ViewController {
	
	private static String INDEX = "index";
	private static String MAIN = "main";
	
	@GetMapping("main")
	public String main(HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		
		User user = (User) session.getAttribute("user");
		
		if(user != null) {
			return MAIN;
		} else {
			return INDEX;
		}
	}
	
	@GetMapping("user/checkpw")
	public String checkPassWord(HttpServletRequest request) {
		
		User user = (User) request.getSession().getAttribute("user");
		
		if(user == null) {
			return INDEX;
		} else {
			return "user/checkpassword";
		}
	}
	
	@GetMapping("user/userinfo")
	public String userinfo(HttpServletRequest request) {
		
		User user = (User) request.getSession().getAttribute("user");
		
		if(user == null) {
			return INDEX;
		} else {
			return "user/userinfo";
		}
	}
	
	@GetMapping("logout")
	public void logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		HttpSession session = request.getSession();
		
		session.invalidate();
		
		response.sendRedirect(INDEX);
	}

	@RequestMapping("index")
	public String index() {
		
		return INDEX;
	}
	
	@RequestMapping()
	public String defaultPage() {
		
		return INDEX;
	}
	
}
