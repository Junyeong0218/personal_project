package com.jun.web.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.jun.web.dto.SigninDto;
import com.jun.web.service.AuthService;

@Controller
@RequestMapping("/")
public class HomeController {
	
	@Autowired
	private AuthService autoService;
	
	private final String INDEX_URL = "index";
	private final String MAIN_URL = "main";
	
	@PostMapping("index")
	public String signin(@RequestParam(name="username") String username,
						@RequestParam(name="password") String password,
						HttpServletResponse response) throws IOException {
		
		SigninDto signinDto = new SigninDto(username, password);
		
		int result = autoService.signin(signinDto);

		response.setContentType("text/html; charset=UTF-8");
		PrintWriter out = response.getWriter();
		
		if(result == 2) {
			response.sendRedirect(MAIN_URL);
		} else if(result == 1) {
			out.println("<script>alert('비밀번호가 일치하지 않습니다.'); location.href='index';</script>");
			out.close();
		} else {
			out.println("<script>alert('아이디가 일치하지 않습니다.'); location.href='index';</script>");
			out.close();
		}
		
		return INDEX_URL;
	}
	
	@GetMapping("index")
	public String index() {
		
		return INDEX_URL;
	}
	
	@GetMapping()
	public String forIndex() {
		
		return INDEX_URL;
	}

}