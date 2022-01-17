package com.jun.web.service;

import com.jun.web.dto.SigninDto;
import com.jun.web.dto.SignupDto;

public interface AuthService {

	public int signup(SignupDto signupDto);
	public int signin(SigninDto signinDto);
	
	public int checkUsername(String username);
}
