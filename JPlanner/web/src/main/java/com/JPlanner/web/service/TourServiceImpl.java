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
import com.JPlanner.web.dto.UpdateTourReqDto;

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
			place.setTourId(tourDetail.getPlace_tourId());
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
	
	@Override
	public int updateTourSchedulesByReqDto(UpdateTourReqDto updateTourReqDto, int userId) {
		
		List<Tour> origin = updateTourReqDto.getOriginTour();
		List<Tour> changed = updateTourReqDto.getChangedTour();
		
		int result = 0;
		for(int i=0; i<origin.size(); i++) {
			Tour originTour = origin.get(i);
			Tour changedTour = changed.get(i);
			
			if(!isEqualTour(originTour, changedTour)) {
				result += tourDao.updateTourByTour(changedTour);
			}
			
			List<Place> originPlaces = originTour.getPlaces();
			List<Place> changedPlaces = changedTour.getPlaces();
			
			for(int j=0; j<changedPlaces.size(); j++) {
				Place changedPlace = changedPlaces.get(j);
				boolean isFound = false;
				
				searchSamePlace:
				for(int k=0; k<originPlaces.size(); k++) {
					Place originPlace = changedPlaces.get(k);
					
					if(isEqualPlace(originPlace, changedPlace)) {
						changedPlace.setId(originPlace.getId());
						result += tourDao.updatePlaceByPlace(changedPlace);
						originPlaces.remove(k);
						isFound = true;
						break searchSamePlace;
					}
				}
				if(isFound == false && originPlaces.size() == 0) {
					result += tourDao.insertPlaceByPlace(changedPlace);
				}
			}
			
			for(int j=0; j<originPlaces.size(); j++) {
				tourDao.deletePlaceByPlaceId(originPlaces.get(j).getId());
			}
		}
		
		return result;
	}
	
	private boolean isEqualPlace(Place origin, Place changed) {
		return Double.compare(origin.getCoordX(), changed.getCoordX()) == 0 &&
			   Double.compare(origin.getCoordY(), changed.getCoordY()) == 0 &&
			   origin.getPlaceAddress().equals(changed.getPlaceAddress()) &&
			   origin.getPlaceId() == changed.getPlaceId() &&
			   origin.getPlaceName().equals(changed.getPlaceName());
	}
	
	private boolean isEqualTour(Tour origin, Tour changed) {
		return origin.getSearchPriority().equals(changed.getSearchPriority()) &&
			   origin.getStartDateTime().isEqual(changed.getStartDateTime()) &&
			   origin.getArriveDateTime().isEqual(changed.getArriveDateTime());
	}

}
