package com.jun.web.service;

import java.io.IOException;

import com.jun.web.domain.user.User;
import com.jun.web.dto.SigninDto;
import com.jun.web.dto.SignupDto;
import com.jun.web.dto.UpdatePasswordDto;
import com.jun.web.dto.UpdateUserInfoDto;

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
