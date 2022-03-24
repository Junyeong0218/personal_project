package com.JPlanner.web.controller.restController;

import java.io.IOException;
import java.util.StringTokenizer;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;

import org.springframework.core.io.ClassPathResource;
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

	private AuthService authService;
	
	@PostMapping("modifyUserInfo")
	public int modifyUserInfo(UpdateUserReqDto updateUserInfoDto,
							  @AuthenticationPrincipal PrincipalDetails principalDetails)
									 throws IOException, ServletException {
		
		User user = principalDetails.getUser();
		updateUserInfoDto.setId(user.getId());
		
		System.out.println(updateUserInfoDto);
		
		int result = 1;
		
		if(updateUserInfoDto.getFile() == null) {
			result = authService.updateUser(updateUserInfoDto); 
		} else {
			String url = new ClassPathResource("/static/images/userinfo/" + user.getUsername()).getPath();
			
			StringTokenizer st = new StringTokenizer(updateUserInfoDto.getFile().getContentType(), "/");
			
			int tokens = st.countTokens();
			
			for(int i=0; i<tokens-1; i++) {
				st.nextToken();
			}
			
			updateUserInfoDto.setImgType(st.nextToken());
			System.out.println(updateUserInfoDto.getImgType());
			
			result = authService.updateUser(updateUserInfoDto, url);
		}
		
		if(result == 1) {
			user = authService.selectUserById(updateUserInfoDto.getId());
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
