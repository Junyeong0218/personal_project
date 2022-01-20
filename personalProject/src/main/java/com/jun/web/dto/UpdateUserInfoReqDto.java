package com.jun.web.dto;

import lombok.Data;

@Data
public class UpdateUserInfoReqDto {
	
	private String password;
	private String name;
	private int pwQuestion;
	private String pwAnswer;

}
