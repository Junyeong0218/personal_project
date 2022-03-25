package com.JPlanner.web.entity.user;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserRepository {
	
	public int signup(User user);
	
	public int selectUsernameByUsername(String username);
	public String checkPasswordbyUsername(String username);
	
	public User selectUserByUsername(String username);
	public User selectUserById(int id);
	
	public int updateUserByUser(User user);
	public int updatePasswordByUser(User user);
}
