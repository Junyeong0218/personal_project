package com.JPlanner.web.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.JPlanner.web.domain.Tour.Tour;

@Service
public interface TourService {

	public List<Tour> getTourSchedulesByScheduleId(int scheduleId, int userId);
}
