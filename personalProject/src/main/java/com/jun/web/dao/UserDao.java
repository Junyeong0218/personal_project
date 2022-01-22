package com.jun.web.dao;

import com.jun.web.domain.user.User;
import com.jun.web.dto.UpdatePasswordDto;
import com.jun.web.dto.UpdateUserInfoDto;

public interface UserDao {
	
	public int signin(User user);
	public int signup(User user);
	
	public int selectUsernameByUsername(String username);
	
	public User selectUserByUsername(String username);
	public User selectUserById(int id);
	
	public int updateUserByDto(UpdateUserInfoDto updateUserInfoDto);
	public int updatePasswordByPassword(UpdatePasswordDto updatePasswordDto);
}
