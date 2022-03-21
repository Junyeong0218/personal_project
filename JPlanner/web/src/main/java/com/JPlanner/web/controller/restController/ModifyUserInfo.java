package com.JPlanner.web.controller.restController;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.StringTokenizer;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.JPlanner.web.domain.user.User;
import com.JPlanner.web.dto.UpdatePasswordDto;
import com.JPlanner.web.dto.UpdateUserInfoDto;
import com.JPlanner.web.service.AuthService;

@RestController
@MultipartConfig(
		fileSizeThreshold = 1024 * 1024,
		maxFileSize = 1024 * 1024 * 3,
		maxRequestSize = 1024 * 1024 * 10
)
public class ModifyUserInfo {
	
	@Autowired
	private AuthService authService;
	
	private final String SEP = File.separator;
	
	@PostMapping("/user/modifyuserinfo")
	@ResponseBody
	public void modifyUserInfo(@ModelAttribute UpdateUserInfoDto updateUserInfoDto,
							   HttpServletRequest request,
							   HttpServletResponse response) throws IOException, ServletException {
		
		User user = (User) request.getSession().getAttribute("user");
		updateUserInfoDto.setId(user.getId());
		
		System.out.println(updateUserInfoDto);
		
		int result = 1;
		
		if(updateUserInfoDto.getFile() == null) {
			result = authService.updateUser(updateUserInfoDto); 
		} else {
			String url = request.getServletContext().getRealPath("/static" + SEP + "images" + SEP + "userinfo" + SEP + user.getUsername());
			
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
			HttpSession session = request.getSession();
			user = authService.selectUserById(updateUserInfoDto.getId());
			session.setAttribute("user", user);
		}
		
		System.out.println(result);
		
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.println("{\"result\": " + result + "}");
		out.close();
	}
	
	@PostMapping("/user/modifyuserpw")
	@ResponseBody
	public void modifyUserPw(@RequestParam String password,
							   HttpServletRequest request,
							   HttpServletResponse response) throws IOException, ServletException {
		
		User user = (User) request.getSession().getAttribute("user");
		UpdatePasswordDto updatePasswordDto = new UpdatePasswordDto(user.getId(),
																	password);
		
		int result = authService.updatePassword(updatePasswordDto);
		
		System.out.println(result);
		
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.println("{\"result\": " + result + "}");
		out.close();
	}

}
