package com.JPlanner.web.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.JPlanner.web.entity.tour.Place;
import com.JPlanner.web.entity.tour.Tour;
import com.JPlanner.web.entity.tour.TourDetail;
import com.JPlanner.web.entity.tour.TourRepository;
import com.JPlanner.web.requestDto.UpdateTourReqDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TourServiceImpl implements TourService {
	
	private final TourRepository tourRepository;

	@Override
	public List<Tour> getTourSchedulesByScheduleId(int scheduleId, int userId) {
		
		List<TourDetail> tourDetails = tourRepository.getTourSchedulesById(scheduleId, userId);
		
		List<Tour> tours = new ArrayList<Tour>();
		
		Set<Integer> tour_id = new HashSet<Integer>();
		
		int tourListIndex = -1;
		
		Iterator<TourDetail> tourDetail_iterator = tourDetails.iterator();
		while(tourDetail_iterator.hasNext()) {
			TourDetail tourDetail = tourDetail_iterator.next();
			
			Place place = new Place();
			place.setId(tourDetail.getPlaceIndicator());
			place.setTourId(tourDetail.getPlace_tourId());
			place.setPlace_id(tourDetail.getPlace_id());
			place.setPlace_name(tourDetail.getPlace_name());
			place.setPlace_address(tourDetail.getPlace_address());
			place.setCoord_x(tourDetail.getCoord_x());
			place.setCoord_y(tourDetail.getCoord_y());
			place.setIndex(tourDetail.getIndex());
			place.setStart_datetime(tourDetail.getPlaceStartDateTime());
			place.setStay_time(tourDetail.getStay_time());
			
			if(tour_id.add(tourDetail.getTourId())) {
				Tour tour = new Tour();
				tour.setScheduleId(tourDetail.getScheduleId());
				tour.setId(tourDetail.getTourId());
				tour.setTitle(tourDetail.getTitle());
				tour.setDescription(tourDetail.getDescription());
				tour.setSearch_priority(tourDetail.getSearch_priority());
				tour.setStart_datetime(tourDetail.getTourStartDateTime());
				tour.setArrive_datetime(tourDetail.getTourArriveDateTime());
				tour.setPlaces(new ArrayList<Place>());
				
				tours.add(tour);
				tourListIndex++;
			}
			
			tours.get(tourListIndex).getPlaces().add(place);
		}
		return tours;
	}
	
	@Override
	public int insertTourSchedulesByReqDto(UpdateTourReqDto updateTourReqDto) {

		List<Tour> tours = updateTourReqDto.getChangedTour();
		int totalResult = 0;
		
		for(int i=0; i<tours.size(); i++) {
			Tour tour = tours.get(i);
			System.out.println("insert??? tour : ");
			System.out.println(tour);
			int result = tourRepository.insertTourByTour(tour);
			int tourId = 0;
			totalResult += result;
			if(result == 1) {
				System.out.println("tourId ????????????");
				tourId = tourRepository.selectTourIdByTour(tour);
				System.out.println("????????? tourId : " + tourId);
				if(tourId == 0) {
					throw new IllegalArgumentException("tourId??? ????????? ??? ??????");
				}
				List<Place> places = tours.get(i).getPlaces();
				for(int j=0; j<places.size(); j++) {
					Place place = places.get(j);
					place.setTourId(tourId);
					System.out.println("insert??? place : ");
					System.out.println(place);
				}
				totalResult += tourRepository.insertPlacesByPlace(places);
			} else {
				throw new IllegalArgumentException("tour insert ??????");
			}
		}
		
		return totalResult;
	}
	
	@Override
	public int updateTourSchedulesByReqDto(UpdateTourReqDto updateTourReqDto) {
		
		List<Tour> origin = updateTourReqDto.getOriginTour();
		List<Tour> changed = updateTourReqDto.getChangedTour();
		
		int result = 0;
		for(int i=0; i<origin.size(); i++) {
			Tour originTour = origin.get(i);
			Tour changedTour = changed.get(i);
			System.out.println(originTour);
			System.out.println(changedTour);
			
			if(!isEqualTour(originTour, changedTour)) {
				result += tourRepository.updateTourByTour(changedTour);
				System.out.println("! isEqualTour : " + !isEqualTour(originTour, changedTour) + " -> update ???????????????.\n");
			}
			
			List<Place> originPlaces = originTour.getPlaces();
			List<Place> changedPlaces = changedTour.getPlaces();
			
			for(int j=0; j<changedPlaces.size(); j++) {
				Place changedPlace = changedPlaces.get(j);
				boolean isFound = false;
				System.out.println("changedPlace ?????? ?????? : " + changedPlace);
				
				searchSamePlace:
				for(int k=0; k<originPlaces.size(); k++) {
					Place originPlace = originPlaces.get(k);
					
					if(isEqualPlace(originPlace, changedPlace)) {
						changedPlace.setId(originPlace.getId());
						result += tourRepository.updatePlaceByPlace(changedPlace);
						System.out.println("founded ! -> placeIndicator ????????? changedPlcae ??????");
						System.out.println("[changed]" + changedPlace);
						originPlaces.remove(k);
						isFound = true;
						break searchSamePlace;
					}
				}
				System.out.println("originPlaces ?????? ?????? ?????? ?????? insert ????????? ?????? changedPlace");
				if(isFound == false) {
					result += tourRepository.insertPlaceByPlace(changedPlace);
					System.out.println("insert ?????? changedPlace : " + changedPlace);
				}
				System.out.println("-----------------------------------------------------------------");
			}
			System.out.println("changedPlaces??? ?????? ??? ????????? originPlaces" + originPlaces);
			for(int j=0; j<originPlaces.size(); j++) {
				tourRepository.deletePlaceByPlaceId(originPlaces.get(j).getId());
				System.out.println("????????? place = " + originPlaces.get(j));
			}
			System.out.println("Tour 1??? ?????? ???----------------------------------------------------------------------");
		}
		
		return result;
	}
	
	private boolean isEqualPlace(Place origin, Place changed) {
		return Double.compare(origin.getCoord_x(), changed.getCoord_x()) == 0 &&
			   Double.compare(origin.getCoord_y(), changed.getCoord_y()) == 0 &&
			   origin.getPlace_address().equals(changed.getPlace_address()) &&
			   origin.getPlace_id() == changed.getPlace_id() &&
			   origin.getPlace_name().equals(changed.getPlace_name());
	}
	
	private boolean isEqualTour(Tour origin, Tour changed) {
		return origin.getSearch_priority().equals(changed.getSearch_priority()) &&
			   origin.getStart_datetime().isEqual(changed.getStart_datetime()) &&
			   origin.getArrive_datetime().isEqual(changed.getArrive_datetime());
	}

}
