package com.JPlanner.web.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.JPlanner.web.dao.UserDao;
import com.JPlanner.web.domain.user.User;
import com.JPlanner.web.dto.SigninDto;
import com.JPlanner.web.dto.SignupDto;
import com.JPlanner.web.dto.UpdatePasswordDto;
import com.JPlanner.web.dto.UpdateUserInfoDto;

@Service
public class AuthServiceImpl implements AuthService {
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private FileService fileService;
	
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
	public int checkPassword(SigninDto signinDto) {
		User user = signinDto.toEntity();
		
		int result = userDao.signin(user);
		
		return result;
	}
	
	@Override
	public User selectUserByUsername(String username) {
		User user = userDao.selectUserByUsername(username);
		
		return user;
	}
	
	@Override
	public User selectUserById(int id) {
		User user = userDao.selectUserById(id);
		
		return user;
	}
	
	@Override
	public int updateUser(UpdateUserInfoDto updateUserInfoDto) {
		int result = userDao.updateUserByDto(updateUserInfoDto);
		
		return result;
	}
	
	@Override
	public int updateUser(UpdateUserInfoDto updateUserInfoDto, String url) throws IOException {
		boolean uploadFlag = fileService.setProfileImage(updateUserInfoDto.getFile(), updateUserInfoDto.getImgType(), url);
		int result = -1;
		
		if(uploadFlag) {
			result = userDao.updateUserByDto(updateUserInfoDto);
		}
		
		return result;
	}
	
	@Override
	public int updatePassword(UpdatePasswordDto updatePasswordDto) {
		int result = userDao.updatePasswordByPassword(updatePasswordDto);
				
		return result;
	}

}
