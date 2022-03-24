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
	private int question;
	private String answer;
	private String imgType;
	private MultipartFile file;
	
	public User toEntity() {
		return User.builder()
				   .id(id)
				   .name(name)
				   .pwQuestion(question)
				   .pwAnswer(answer)
				   .imgType(imgType)
				   .file(file)
				   .build();
	}

}
