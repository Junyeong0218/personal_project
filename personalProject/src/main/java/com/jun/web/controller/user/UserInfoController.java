package com.jun.web.controller.user;

import java.io.IOException;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jun.web.dto.UpdateReqDto;
import com.jun.web.service.AuthService;

@Controller
@RequestMapping("/user/")
@MultipartConfig(
		fileSizeThreshold = 1024 * 1024,
		maxFileSize = 1024 * 1024 * 3,
		maxRequestSize = 1024 * 1024 * 10
)
public class UserInfoController {
	
	@Autowired
	private AuthService authService;

	@GetMapping("checkpw")
	public String getCheckPassword() {
		
		return "/user/checkpassword";
	}
	
	@GetMapping("userinfo")
	public String checkUserInfo() {
		
		return "/user/userinfo";
	}
	
	@PostMapping("userinfo")
	public void modifyUserInfo(UpdateReqDto updateReqDto,
							   HttpServletResponse response) throws IOException {
		
		System.out.println(updateReqDto);
		
	}
}
