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
	private int pw_question;
	private String pw_answer;
	private MultipartFile file;
	private String image_type;
	private LocalDateTime create_date;
	private LocalDateTime update_date;
	
	private String role;
	
}
