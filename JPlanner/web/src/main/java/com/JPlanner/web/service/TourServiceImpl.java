package com.JPlanner.web.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.JPlanner.web.dao.TourDao;
import com.JPlanner.web.domain.Entity.TourDetail;
import com.JPlanner.web.domain.Tour.Place;
import com.JPlanner.web.domain.Tour.Tour;

@Service
public class TourServiceImpl implements TourService {
	
	@Autowired
	private TourDao tourDao;

	@Override
	public List<Tour> getTourSchedulesByScheduleId(int scheduleId, int userId) {
		
		List<TourDetail> tourDetails = tourDao.getTourSchedulesById(scheduleId, userId);
		
		List<Tour> tours = new ArrayList<Tour>();
		
		Set<Integer> tour_id = new HashSet<Integer>();
		
		int tourListIndex = -1;
		
		Iterator<TourDetail> tourDetail_iterator = tourDetails.iterator();
		while(tourDetail_iterator.hasNext()) {
			TourDetail tourDetail = tourDetail_iterator.next();
			
			Place place = new Place();
			place.setId(tourDetail.getPlaceIndicator());
			place.setPlaceId(tourDetail.getPlaceId());
			place.setPlaceName(tourDetail.getPlaceName());
			place.setPlaceAddress(tourDetail.getPlaceAddress());
			place.setCoordX(tourDetail.getCoordX());
			place.setCoordY(tourDetail.getCoordY());
			place.setIndex(tourDetail.getIndex());
			place.setStartDateTime(tourDetail.getPlaceStartDateTime());
			place.setStayTime(tourDetail.getStayTime());
			
			if(tour_id.add(tourDetail.getTourId())) {
				Tour tour = new Tour();
				tour.setScheduleId(tourDetail.getScheduleId());
				tour.setId(tourDetail.getTourId());
				tour.setTitle(tourDetail.getTitle());
				tour.setDescription(tourDetail.getDescription());
				tour.setSearchPriority(tourDetail.getSearchPriority());
				tour.setStartDateTime(tourDetail.getTourStartDateTime());
				tour.setArriveDateTime(tourDetail.getTourArriveDateTime());
				tour.setPlaces(new ArrayList<Place>());
				
				tours.add(tour);
				tourListIndex++;
			}
			
			tours.get(tourListIndex).getPlaces().add(place);
		}
		return tours;
	}

}
