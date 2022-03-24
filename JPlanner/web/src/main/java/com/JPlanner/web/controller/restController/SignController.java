package com.JPlanner.web.controller.restController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.JPlanner.web.requestDto.SignupReqDto;
import com.JPlanner.web.service.AuthService;

@RestController
public class SignController {
	
	@Autowired
	private AuthService authService;
	
	@PostMapping("/signup")
	public int singup(SignupReqDto signupReqDto) {
		
		int result = authService.signup(signupReqDto);
		
		return result;
	}

}
