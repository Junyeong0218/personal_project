package com.JPlanner.web.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.JPlanner.web.domain.Tour.Tour;

@Repository
public interface TourDao {

	public List<Tour> getTourSchedulesById(int id, int userId);
}
