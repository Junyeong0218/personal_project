package com.jun.web.controller.user;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jun.web.domain.user.User;
import com.jun.web.dto.UpdateUserInfoReqDto;
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
	public void modifyUserInfo(@ModelAttribute UpdateUserInfoReqDto updateUserInfoReqDto,
							   HttpServletRequest request,
							   HttpServletResponse response) throws IOException, ServletException {
		
		User user = (User) request.getSession().getAttribute("user");
		updateUserInfoReqDto.setId(user.getId());
		
		System.out.println(updateUserInfoReqDto);
		
		int result = authService.updateUserByReqDto(updateUserInfoReqDto);
		
		
	}
}
