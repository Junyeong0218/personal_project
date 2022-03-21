package com.JPlanner.web.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.JPlanner.web.domain.Tour.Tour;
import com.JPlanner.web.dto.UpdateTourReqDto;

@Service
public interface TourService {

	public List<Tour> getTourSchedulesByScheduleId(int scheduleId, int userId);
	
	public int insertTourSchedulesByReqDto(UpdateTourReqDto updateTourReqDto);
	public int updateTourSchedulesByReqDto(UpdateTourReqDto updateTourReqDto);
}
