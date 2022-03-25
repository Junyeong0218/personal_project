package com.JPlanner.web.entity.tour;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TourRepository {

	public List<TourDetail> getTourSchedulesById(int scheduleId, int userId);
	
	public int insertTourByTour(Tour tour);
	public int selectTourIdByTour(Tour tour);
	public int updateTourByTour(Tour tour);
	
	public int updatePlaceByPlace(Place place);
	public int insertPlacesByPlace(List<Place> places);
	public int insertPlaceByPlace(Place place);
	public int deletePlaceByPlaceId(int placeId);
}
