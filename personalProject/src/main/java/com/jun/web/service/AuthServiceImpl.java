package com.jun.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jun.web.dao.UserDao;
import com.jun.web.domain.user.User;
import com.jun.web.dto.SignupDto;

@Service
public class AuthServiceImpl implements AuthService {
	
	@Autowired
	private UserDao userDao;
	
	@Override
	public int signin() {
		// TODO Auto-generated method stub
		return 0;
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

}
