package com.JPlanner.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.JPlanner.web.dao.TourDao;
import com.JPlanner.web.domain.Tour.Tour;

@Service
public class TourServiceImpl implements TourService {
	
	@Autowired
	private TourDao tourDao;

	@Override
	public List<Tour> getTourSchedulesByScheduleId(int scheduleId, int userId) {
		
		List<Tour> tours = tourDao.getTourSchedulesById(scheduleId, userId);
		
		return tours;
	}
}
