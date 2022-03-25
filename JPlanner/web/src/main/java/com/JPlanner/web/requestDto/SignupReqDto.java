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
	private int pw_question;
	private String pw_answer;
	
	public User toEntity() {
		return User.builder()
				   .username(username)
				   .password(password)
				   .name(name)
				   .pw_question(pw_question)
				   .pw_answer(pw_answer)
				   .build();
	}
}
