package com.jun.web.controller.user;

import java.io.IOException;
import java.util.Collection;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
	public void modifyUserInfo(@RequestParam String password,
							   HttpServletResponse response) throws IOException, ServletException {
		
		
		
		
		System.out.println(password);
		
	}
}
