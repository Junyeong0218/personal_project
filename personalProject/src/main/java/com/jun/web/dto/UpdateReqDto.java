package com.jun.web.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class UpdateReqDto {
	private String password;
	private String name;
	private MultipartFile file;
}
