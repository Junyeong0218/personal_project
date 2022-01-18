package com.jun.web.dao;

import com.jun.web.domain.user.User;

public interface UserDao {
	
	public int signin(User user);
	public int signup(User user);
	
	public int selectUsernameByUsername(String username);
	
	public User selectUserByUsername(String username);
}
