package com.jun.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jun.web.dao.UserDao;
import com.jun.web.domain.user.User;
import com.jun.web.dto.SigninDto;
import com.jun.web.dto.SignupDto;

@Service
public class AuthServiceImpl implements AuthService {
	
	@Autowired
	private UserDao userDao;
	
	@Override
	public int signin(SigninDto signinDto) {
		User user = signinDto.toEntity();
		
		int result = userDao.signin(user);
		
		return result;
	}
	
	@Override
	public int signup(SignupDto signupDto) {
		User user = signupDto.toEntity();
		
		int result = userDao.signup(user);
		
		return result;
	}
	
	@Override
	public int checkUsername(String username) {
		
		int result = userDao.selectUsernameByUsername(username);
		
		return result;
	}
	
	@Override
	public User selectUserByUsername(String username) {
		User user = userDao.selectUserByUsername(username);
		
		return user;
	}

}
