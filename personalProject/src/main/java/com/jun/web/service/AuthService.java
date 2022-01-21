package com.jun.web.service;

import com.jun.web.domain.user.User;
import com.jun.web.dto.SigninDto;
import com.jun.web.dto.SignupDto;
import com.jun.web.dto.UpdateUserInfoReqDto;

public interface AuthService {

	public int signup(SignupDto signupDto);
	public int signin(SigninDto signinDto);
	
	public int checkUsername(String username);
	public int checkPassword(SigninDto signinDto);
	
	public User selectUserByUsername(String username);
	
	public int updateUserByReqDto(UpdateUserInfoReqDto dto);
	
}
