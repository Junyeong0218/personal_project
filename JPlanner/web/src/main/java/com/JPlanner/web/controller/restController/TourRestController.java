package com.JPlanner.web.controller.restController;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.JPlanner.web.domain.Tour.Tour;
import com.JPlanner.web.domain.user.User;
import com.JPlanner.web.dto.UpdateTourReqDto;
import com.JPlanner.web.service.TourService;

@RestController
@RequestMapping("/tour/")
public class TourRestController {

	@Autowired
	private TourService tourService;
	
	@PostMapping("getTourSchedules")
	public List<Tour> getTourSchedules(int scheduleId, HttpServletRequest request) {
		
		User user = (User) request.getSession().getAttribute("user");
		
		List<Tour> tours = tourService.getTourSchedulesByScheduleId(scheduleId, user.getId());
		
		return tours;
	}
	
	@PostMapping("insertTourSchedules")
	public int insertTourSchedules(ArrayList<Tour> tours, HttpServletRequest request) {
		
		User user = (User) request.getSession().getAttribute("user");
		
		System.out.println(tours);
		
		return 1;
	}
	
	@PostMapping("updateTourSchedules")
	public int updateTourSchedules(@RequestBody UpdateTourReqDto updateTourReqDto, HttpServletRequest request) {
		
		User user = (User) request.getSession().getAttribute("user");
		
		int result = tourService.updateTourSchedulesByReqDto(updateTourReqDto, user.getId());
		
		return result;
	}
}
