package com.JPlanner.web.controller.restController;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.JPlanner.web.config.auth.PrincipalDetails;
import com.JPlanner.web.entity.user.User;
import com.JPlanner.web.requestDto.SigninReqDto;
import com.JPlanner.web.requestDto.UpdateUserReqDto;
import com.JPlanner.web.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@MultipartConfig(
		fileSizeThreshold = 1024 * 1024,
		maxFileSize = 1024 * 1024 * 3,
		maxRequestSize = 1024 * 1024 * 10
)
@RequestMapping("/user/")
@RequiredArgsConstructor
public class ModifyUserInfo {

	private final AuthService authService;
	
	@PostMapping("modifyUserInfo")
	public int modifyUserInfo(UpdateUserReqDto UpdateUserReqDto,
							  @AuthenticationPrincipal PrincipalDetails principalDetails)
									 throws IOException, ServletException {
		
		User user = principalDetails.getUser();
		UpdateUserReqDto.setId(user.getId());
		
		System.out.println(UpdateUserReqDto);
		
		int result = authService.updateUser(UpdateUserReqDto, principalDetails.getUser());
		
		if(result == 1) {
			user = authService.selectUserById(UpdateUserReqDto.getId());
			principalDetails.setUser(user);
		}
		
		return result;
	}
	
	@PostMapping("modifyUserPassword")
	public int modifyUserPassword(SigninReqDto signinReqDto,
								  @AuthenticationPrincipal PrincipalDetails principalDetails) 
										  throws IOException, ServletException {
		
		User user = principalDetails.getUser();
		signinReqDto.setId(user.getId());
		
		int result = authService.updatePassword(signinReqDto);
		
		return result;
	}

}
