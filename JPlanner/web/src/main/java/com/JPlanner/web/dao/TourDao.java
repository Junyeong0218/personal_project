package com.JPlanner.web.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.JPlanner.web.domain.tour.Place;
import com.JPlanner.web.domain.tour.Tour;
import com.JPlanner.web.entity.Entity.TourDetail;

@Repository
public interface TourDao {

	public List<TourDetail> getTourSchedulesById(int id, int userId);
	
	public int insertTourByTour(Tour tour);
	public int selectTourIdByTour(Tour tour);
	public int updateTourByTour(Tour tour);
	
	public int updatePlaceByPlace(Place place);
	public int insertPlaceByPlace(Place place);
	public int deletePlaceByPlaceId(int placeId);
}
