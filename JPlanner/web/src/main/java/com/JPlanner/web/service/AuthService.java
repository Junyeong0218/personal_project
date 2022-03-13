package com.JPlanner.web.service;

import java.io.IOException;

import com.JPlanner.web.domain.user.User;
import com.JPlanner.web.dto.SigninDto;
import com.JPlanner.web.dto.SignupDto;
import com.JPlanner.web.dto.UpdatePasswordDto;
import com.JPlanner.web.dto.UpdateUserInfoDto;

public interface AuthService {

	public int signup(SignupDto signupDto);
	public int signin(SigninDto signinDto);
	
	public int checkUsername(String username);
	public int checkPassword(SigninDto signinDto);
	
	public User selectUserByUsername(String username);
	public User selectUserById(int id);
	
	public int updateUser(UpdateUserInfoDto updateUserInfoDto);
	public int updateUser(UpdateUserInfoDto updateUserInfoDto, String url) throws IOException;
	public int updatePassword(UpdatePasswordDto updatePasswordDto);
	
}
