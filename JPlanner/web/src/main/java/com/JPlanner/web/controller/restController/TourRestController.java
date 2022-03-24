package com.JPlanner.web.controller.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.JPlanner.web.config.auth.PrincipalDetails;
import com.JPlanner.web.entity.tour.Tour;
import com.JPlanner.web.entity.user.User;
import com.JPlanner.web.requestDto.UpdateTourReqDto;
import com.JPlanner.web.service.TourService;

@RestController
@RequestMapping("/tour/")
public class TourRestController {

	@Autowired
	private TourService tourService;
	
	@PostMapping("getTourSchedules")
	public List<Tour> getTourSchedules(int scheduleId,
									   @AuthenticationPrincipal PrincipalDetails principalDetails) {
		
		User user = principalDetails.getUser();
		
		List<Tour> tours = tourService.getTourSchedulesByScheduleId(scheduleId, user.getId());
		
		return tours;
	}
	
	@PostMapping("insertTourSchedules")
	public int insertTourSchedules(@RequestBody UpdateTourReqDto updateTourReqDto) {
		
		int result = tourService.insertTourSchedulesByReqDto(updateTourReqDto);
		
		return result;
	}
	
	@PostMapping("updateTourSchedules")
	public int updateTourSchedules(@RequestBody UpdateTourReqDto updateTourReqDto) {
		
		int result = tourService.updateTourSchedulesByReqDto(updateTourReqDto);
		
		return result;
	}
}
