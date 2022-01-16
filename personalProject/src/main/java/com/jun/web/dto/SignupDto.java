package com.jun.web.dto;

import com.jun.web.domain.user.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SignupDto {

	private String username;
	private String password;
	private String name;
	private int pwQuestion;
	private String pwAnswer;
	
	public User toEntity() {
		return User.builder()
				.username(username)
				.password(password)
				.name(name)
				.pwQuestion(pwQuestion)
				.pwAnswer(pwAnswer)
				.build();
	}
}
