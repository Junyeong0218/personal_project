package com.jun.web.api;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.jun.web.domain.user.User;
import com.jun.web.dto.SigninDto;
import com.jun.web.service.AuthService;

@RestController
@RequestMapping("/user/")
public class CheckUserinfo {

	@Autowired
	private AuthService authService;
	
	@PostMapping("checkusername")
	@ResponseBody
	public void checkUsername(@RequestParam String username,
							 HttpServletResponse response) throws IOException {
		
		int result = authService.checkUsername(username);
		
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.println("{\"result\": " + result + "}");
		out.close();
	}
	
	@PostMapping("checkpw")
	@ResponseBody
	public void postCheckPassword(@RequestParam(name="password") String password,
								  HttpServletRequest request,
								  HttpServletResponse response) throws IOException {
		
		User user = (User) request.getSession().getAttribute("user");
		SigninDto signinDto = new SigninDto(user.getUsername(), password);
		
		int result = authService.checkPassword(signinDto);

		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.println("{\"result\": " + result + "}");
		out.close();
	}
}
