package com.jun.web.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class UpdateUserInfoReqDto {
	
	private int id;
	private String password;
	private String name;
	private int question;
	private String answer;
	private MultipartFile file;

}
