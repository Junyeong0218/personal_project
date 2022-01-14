package com.jun.web.controller.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/user/")
public class SignupController {

	@RequestMapping("signup")
	public ModelAndView signup() {
		
		ModelAndView modelAndView = new ModelAndView("user/signup");
		
		return modelAndView;
	}
}
