package com.jun.web.dao;

import com.jun.web.domain.user.User;

public interface UserDao {

	public int selectUsernameByUsername(String username);
	
	public int signin();
	public int signup(User user);
}
