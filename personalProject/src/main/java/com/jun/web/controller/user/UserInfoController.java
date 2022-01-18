package com.jun.web.controller.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user/")
public class UserInfoController {

	@GetMapping("checkpw")
	public String checkPassword() {
		
		return "/user/checkpassword";
	}
	
	@GetMapping("userinfo")
	public String checkUserInfo() {
		
		return "/user/userinfo";
	}
	
	@PostMapping("userinfo")
	public void modifyUserInfo() {
		
		
	}
}
