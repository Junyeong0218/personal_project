package com.jun.web.dto;

import com.jun.web.domain.user.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SigninDto {

	private String username;
	private String password;
	
	public User toEntity() {
		return User.builder()
				.username(username)
				.password(password)
				.build();
	}
}
