package com.JPlanner.web.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.JPlanner.web.domain.Entity.TourDetail;

@Repository
public interface TourDao {

	public List<TourDetail> getTourSchedulesById(int id, int userId);
}
