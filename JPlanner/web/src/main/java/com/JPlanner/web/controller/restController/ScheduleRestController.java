package com.JPlanner.web.controller.restController;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.JPlanner.web.config.auth.PrincipalDetails;
import com.JPlanner.web.entity.schedule.Schedule;
import com.JPlanner.web.entity.user.User;
import com.JPlanner.web.requestDto.InsertScheduleReqDto;
import com.JPlanner.web.requestDto.UpdateScheduleReqDto;
import com.JPlanner.web.responseDto.MainCalendarResDto;
import com.JPlanner.web.service.ScheduleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user/")
@RequiredArgsConstructor
public class ScheduleRestController {
	
	private final ScheduleService scheduleService;
	
	@PostMapping("getCalendar")
	public MainCalendarResDto getCalendar(int ym, @AuthenticationPrincipal PrincipalDetails principalDetails) {
		if(ym == 0) {
			ym = LocalDateTime.now().getYear() * 100 + LocalDateTime.now().getMonthValue();
		}
		
		User user = principalDetails.getUser();
		
		List<Integer> dates = scheduleService.selectAllDates(ym);
		Map<Integer, List<Schedule>> schedules = scheduleService.selectSchedules(dates, user.getId());
		
		MainCalendarResDto mainCalendarResDto = new MainCalendarResDto(dates, schedules);
		
		return mainCalendarResDto;
	}
	
	@PostMapping("getSchedule")
	public Schedule getSchedule(int scheduleId) {
		
		Schedule schedule = scheduleService.getSchedule(scheduleId);
		
		return schedule;
		
	}
	
	@PostMapping("getScheduleList")
	public List<Schedule> getScheduleList(int ym, @AuthenticationPrincipal PrincipalDetails principalDetails) {
		
		User user = principalDetails.getUser();
		
		List<Schedule> scheduleList = scheduleService.getScheduleList(ym, user.getId());
		
		return scheduleList;
		
	}
	
	@PostMapping("insertCommonSchedule")
	public int insertCommonSchedule(InsertScheduleReqDto insertScheduleDto,
									@AuthenticationPrincipal PrincipalDetails principalDetails) {
		
		if(insertScheduleDto.getDescription() == null || insertScheduleDto.getDescription().equals("")) {
			insertScheduleDto.setDescription(insertScheduleDto.getTitle());
		}
		
		User user = principalDetails.getUser();
		
		int result = scheduleService.insertCommonSchedule(insertScheduleDto, user.getId());
		
		return result;
	}
	
	@PostMapping("insertTourSchedule")
	public Schedule insertTourSchedule(InsertScheduleReqDto insertScheduleDto,
									   @AuthenticationPrincipal PrincipalDetails principalDetails) {
		
		if(insertScheduleDto.getDescription() == null || insertScheduleDto.getDescription().equals("")) {
			insertScheduleDto.setDescription(insertScheduleDto.getTitle());
		}
		
		User user = principalDetails.getUser();
		
		Schedule insertedSchedule = scheduleService.insertTourSchedule(insertScheduleDto, user.getId());
		
		return insertedSchedule;
	}

	@PostMapping("updateCommonSchedule")
	public int updateCommonSchedule(UpdateScheduleReqDto updateScheduleDto,
									@AuthenticationPrincipal PrincipalDetails principalDetails) {
		
		if(updateScheduleDto.getDescription() == null || updateScheduleDto.getDescription().equals("")) {
			updateScheduleDto.setDescription(updateScheduleDto.getTitle());
		}
		
		User user = principalDetails.getUser();
		
		int result = scheduleService.updateCommonSchedule(updateScheduleDto, user.getId());
		
		return result;
	}
	
	@PostMapping("updateTourSchedule")
	public Schedule updateTourSchedule(UpdateScheduleReqDto updateScheduleDto,
									   @AuthenticationPrincipal PrincipalDetails principalDetails) {
		
		if(updateScheduleDto.getDescription() == null || updateScheduleDto.getDescription().equals("")) {
			updateScheduleDto.setDescription(updateScheduleDto.getTitle());
		}
		System.out.println(updateScheduleDto);
		
		User user = principalDetails.getUser();
		
		Schedule updatedSchedule = scheduleService.updateTourSchedule(updateScheduleDto, user.getId());
		
		return updatedSchedule;
	}
	
	@PostMapping("deleteSchedule")
	public int deleteSchedule(int scheduleId) throws IOException {
		
		int result = scheduleService.deleteSchedule(scheduleId);
		
		return result;
	}

}
