package com.jun.web.domain.user;

import java.time.LocalDateTime;

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
	private String imgType;
	private LocalDateTime createDate;
	private LocalDateTime updateDate;
	
}
