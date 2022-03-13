package com.JPlanner.web.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserInfoDto {
	
	private int id;
	private String name;
	private int question;
	private String answer;
	private String imgType;
	private MultipartFile file;

}
