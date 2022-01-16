package com.jun.web.api;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.jun.web.service.AuthService;

@Controller
public class CheckUsername {

	@Autowired
	private AuthService authService;
	
	@RequestMapping(value="/user/checkusername", method = RequestMethod.POST)
	@ResponseBody
	public void checkUsername(@RequestParam(name="username")String username,
							 HttpServletResponse response) throws IOException {
		
		int result = authService.checkUsername(username);
		
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.println("{\"result\": " + result + "}");
		out.close();
	}
}
