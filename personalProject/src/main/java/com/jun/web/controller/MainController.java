package com.jun.web.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jun.web.domain.user.User;

@Controller
@RequestMapping("/")
public class MainController {

	private final String MAIN_URL = "main";
	private final String INDEX_URL = "index";
	
	@GetMapping("main")
	public String main(HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		
		User user = (User) session.getAttribute("user");
		
		if(user != null) {
			return MAIN_URL;
		} else {
			return INDEX_URL;
		}
	}
	
	@GetMapping("logout")
	public void logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		HttpSession session = request.getSession();
		
		session.invalidate();
		
		response.sendRedirect(INDEX_URL);
	}
}
