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
	public int insertTourSchedulesByReqDto(UpdateTourReqDto updateTourReqDto) {

		List<Tour> tours = updateTourReqDto.getChangedTour();
		int totalResult = 0;
		
		for(int i=0; i<tours.size(); i++) {
			Tour tour = tours.get(i);
			System.out.println("insert할 tour : ");
			System.out.println(tour);
			int result = tourDao.insertTourByTour(tour);
			int tourId = 0;
			totalResult += result;
			if(result == 1) {
				System.out.println("tourId 받아오기");
				tourId = tourDao.selectTourIdByTour(tour);
				System.out.println("받아온 tourId : " + tourId);
				if(tourId == 0) {
					throw new IllegalArgumentException("tourId를 받아올 수 없음");
				}
				List<Place> places = tours.get(i).getPlaces();
				for(int j=0; j<places.size(); j++) {
					Place place = places.get(j);
					place.setTourId(tourId);
					System.out.println("insert할 place : ");
					System.out.println(place);
					totalResult += tourDao.insertPlaceByPlace(place);
				}
			} else {
				throw new IllegalArgumentException("tour insert 실패");
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
				result += tourDao.updateTourByTour(changedTour);
				System.out.println("! isEqualTour : " + !isEqualTour(originTour, changedTour) + " -> update 대상입니다.\n");
			}
			
			List<Place> originPlaces = originTour.getPlaces();
			List<Place> changedPlaces = changedTour.getPlaces();
			
			for(int j=0; j<changedPlaces.size(); j++) {
				Place changedPlace = changedPlaces.get(j);
				boolean isFound = false;
				System.out.println("changedPlace 검색 시작 : " + changedPlace);
				
				searchSamePlace:
				for(int k=0; k<originPlaces.size(); k++) {
					Place originPlace = originPlaces.get(k);
					
					if(isEqualPlace(originPlace, changedPlace)) {
						changedPlace.setId(originPlace.getId());
						result += tourDao.updatePlaceByPlace(changedPlace);
						System.out.println("founded ! -> placeIndicator 세팅된 changedPlcae 출력");
						System.out.println("[changed]" + changedPlace);
						originPlaces.remove(k);
						isFound = true;
						break searchSamePlace;
					}
				}
				System.out.println("originPlaces 에서 발견 못한 경우 insert 대상이 되는 changedPlace");
				if(isFound == false) {
					result += tourDao.insertPlaceByPlace(changedPlace);
					System.out.println("insert 대상 changedPlace : " + changedPlace);
				}
				System.out.println("-----------------------------------------------------------------");
			}
			System.out.println("changedPlaces와 매칭 후 남겨진 originPlaces" + originPlaces);
			for(int j=0; j<originPlaces.size(); j++) {
				tourDao.deletePlaceByPlaceId(originPlaces.get(j).getId());
				System.out.println("삭제된 place = " + originPlaces.get(j));
			}
			System.out.println("Tour 1개 반복 끝----------------------------------------------------------------------");
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
