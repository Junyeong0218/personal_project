package com.JPlanner.web.requestDto;

import org.springframework.web.multipart.MultipartFile;

import com.JPlanner.web.entity.user.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserReqDto {
	
	private int id;
	private String name;
	private int pw_question;
	private String pw_answer;
	private String image_type;
	private MultipartFile file;
	
	public User toEntity() {
		return User.builder()
				   .id(id)
				   .name(name)
				   .pw_question(pw_question)
				   .pw_answer(pw_answer)
				   .image_type(image_type)
				   .file(file)
				   .build();
	}

}
