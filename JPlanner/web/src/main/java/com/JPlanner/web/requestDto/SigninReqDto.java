package com.JPlanner.web.requestDto;

import com.JPlanner.web.entity.user.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SigninReqDto {

	private int id;
	private String username;
	private String password;
	
	public User toEntityWithUsername() {
		return User.builder()
				   .username(username)
				   .password(password)
				   .build();
	}
	
	public User toEntityWithId() {
		return User.builder()
				   .id(id)
				   .password(password)
				   .build();
	}
}
