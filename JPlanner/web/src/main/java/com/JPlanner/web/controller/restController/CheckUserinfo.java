package com.JPlanner.web.controller.restController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.JPlanner.web.config.auth.PrincipalDetails;
import com.JPlanner.web.entity.user.User;
import com.JPlanner.web.requestDto.SigninReqDto;
import com.JPlanner.web.service.AuthService;

@RestController
@RequestMapping("/")
public class CheckUserinfo {

	@Autowired
	private AuthService authService;
	
	@PostMapping("checkUsername")
	public int checkUsername(String username) {
		
		int result = authService.checkUsername(username);
		
		return result;
	}
	
	@PostMapping("user/checkPassword")
	public int checkhPassword(SigninReqDto signinReqDto,
							  @AuthenticationPrincipal PrincipalDetails principalDetails) {
		
		User user = principalDetails.getUser();
		signinReqDto.setUsername(user.getUsername());
		
		int result = authService.checkPassword(signinReqDto);

		return result;
	}
}
