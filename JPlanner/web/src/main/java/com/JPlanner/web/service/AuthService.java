package com.JPlanner.web.service;

import java.io.IOException;

import com.JPlanner.web.entity.user.User;
import com.JPlanner.web.requestDto.SigninReqDto;
import com.JPlanner.web.requestDto.SignupReqDto;
import com.JPlanner.web.requestDto.UpdateUserReqDto;

public interface AuthService {

	public int signup(SignupReqDto signupDto);
	
	public int checkUsername(String username);
	public int checkPassword(SigninReqDto signinDto);
	
	public User selectUserByUsername(String username);
	public User selectUserById(int id);
	
	public int updateUser(UpdateUserReqDto updateUserInfoDto);
	public int updateUser(UpdateUserReqDto updateUserInfoDto, String url) throws IOException;
	public int updatePassword(SigninReqDto signinReqDto);
	
}
