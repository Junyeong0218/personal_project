package com.JPlanner.web.dao;

import com.JPlanner.web.domain.user.User;

public interface UserDao {
	
	public int signup(User user);
	
	public int selectUsernameByUsername(String username);
	public String checkPasswordbyUsername(String username);
	
	public User selectUserByUsername(String username);
	public User selectUserById(int id);
	
	public int updateUserByUserWithImage(User user);
	public int updateUserByUserWithoutImage(User user);
	public int updatePasswordByUser(User user);
}
