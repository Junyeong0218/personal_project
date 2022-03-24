package com.JPlanner.web.entity.user;

import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
	
	private int id;
	private String username;
	private String password;
	private String name;
	private int pwQuestion;
	private String pwAnswer;
	private MultipartFile file;
	private String imgType;
	private LocalDateTime createDate;
	private LocalDateTime updateDate;
	
	private String role;
	
}
