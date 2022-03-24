package com.JPlanner.web.requestDto;

import com.JPlanner.web.entity.user.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SignupReqDto {

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
