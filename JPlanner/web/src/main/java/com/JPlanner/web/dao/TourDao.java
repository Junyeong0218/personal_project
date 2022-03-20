package com.JPlanner.web.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.JPlanner.web.domain.Entity.TourDetail;
import com.JPlanner.web.domain.Tour.Place;
import com.JPlanner.web.domain.Tour.Tour;

@Repository
public interface TourDao {

	public List<TourDetail> getTourSchedulesById(int id, int userId);
	
	public int updateTourByTour(Tour tour);
	public int updatePlaceByPlace(Place place);
	public int insertPlaceByPlace(Place place);
	public int deletePlaceByPlaceId(int placeId);
}
