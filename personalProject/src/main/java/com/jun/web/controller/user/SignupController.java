package com.jun.web.controller.user;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.jun.web.dto.SignupDto;
import com.jun.web.service.AuthService;

@Controller
public class SignupController {
	
	@Autowired
	private AuthService authService;

	@RequestMapping(value="/user/signup", method = RequestMethod.GET)
	public String signup(HttpServletRequest request) {
		
		return "user/signup";
	}
	
	@RequestMapping(value="/user/signup", method = RequestMethod.POST)
	private void regUser(@RequestParam(name="username") String username,
								 @RequestParam(name="password") String password,
								 @RequestParam(name="name") String name,
								 @RequestParam(name="question") int question,
								 @RequestParam(name="answer") String answer,
								 HttpServletResponse response) throws Exception {
		
		SignupDto signupDto = new SignupDto(username,
											password,
											name,
											question,
											answer);
		
		int result = authService.signup(signupDto);
		
		if(result == 1) {
			response.sendRedirect("/index");
		} else {
			PrintWriter out = response.getWriter();
			out.println("<script>alert('회원가입이 정상적으로 이루어지지 않았습니다.\n"
									+ "다시 시도해주세요.');</script>");
			response.sendRedirect("/user/signup");
		}
	}
}
