package com.JPlanner.web.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.JPlanner.web.domain.schedule.Schedule;
import com.JPlanner.web.domain.user.User;
import com.JPlanner.web.service.CalendarService;

@Controller
@RequestMapping("/")
public class ViewController {
	
	private static String INDEX = "index";
	private static String MAIN = "main";
	
	@Autowired
	private CalendarService calendarService;
	
	@GetMapping("main")
	public ModelAndView main(@RequestParam(required = false, defaultValue = "0") int ym,
							 HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		
		User user = (User) session.getAttribute("user");
		
		if(user != null) {
			ModelAndView mav = new ModelAndView(MAIN);
			
			if(ym == 0) {
				ym = LocalDateTime.now().getYear() * 100 + LocalDateTime.now().getMonthValue();
			}
			
			List<Integer> intDates = calendarService.selectAllDates(ym);
			Map<Integer, List<Schedule>> schedules = calendarService.selectSchedules(intDates, user.getId());
			
			List<String> strDates = new ArrayList<String>();
			
			for(int intDate : intDates) {
				strDates.add(Integer.toString(intDate));
			}
			
			String today = LocalDate.now().toString().replaceAll("-", "");
			
			mav.addObject("today", today);
			mav.addObject("selectedMonth", Integer.toString(ym));
			mav.addObject("strDates", strDates);
			mav.addObject("intDates", intDates);
			mav.addObject("schedules", schedules);
			
			return mav;
		} else {
			return new ModelAndView(INDEX);
		}
	}
	
	@GetMapping("logout")
	public void logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		HttpSession session = request.getSession();
		
		session.invalidate();
		
		response.sendRedirect(INDEX);
	}

	@RequestMapping("index")
	public String index() {
		
		return INDEX;
	}
	
	@RequestMapping()
	public String defaultPage() {
		
		return INDEX;
	}
	
}
