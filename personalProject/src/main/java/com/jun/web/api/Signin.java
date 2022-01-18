package com.jun.web.api;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.jun.web.dto.SigninDto;
import com.jun.web.service.AuthService;

@RestController
public class Signin {
	
	@Autowired
	private AuthService authService;
	
	@PostMapping("/signin")
	@ResponseBody
	public void signin(@RequestParam(name="username") String username,
						@RequestParam(name="password") String password,
						HttpServletResponse response) throws IOException {

		SigninDto signinDto = new SigninDto(username, password);
		
		int result = authService.signin(signinDto);
		
		if(result == 2) {
			// session 에 user 객체 추가
		}
		
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.println("{\"result\": " + result + "}");
		out.close();
	}

}
