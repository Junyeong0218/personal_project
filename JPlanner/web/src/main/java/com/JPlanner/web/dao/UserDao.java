package com.JPlanner.web.dao;

import org.springframework.stereotype.Repository;

import com.JPlanner.web.domain.user.User;
import com.JPlanner.web.dto.UpdatePasswordDto;
import com.JPlanner.web.dto.UpdateUserInfoDto;

@Repository
public interface UserDao {
	
	public int signin(User user);
	public int signup(User user);
	
	public int selectUsernameByUsername(String username);
	
	public User selectUserByUsername(String username);
	public User selectUserById(int id);
	
	public int updateUserByDto(UpdateUserInfoDto updateUserInfoDto);
	public int updatePasswordByPassword(UpdatePasswordDto updatePasswordDto);
}
