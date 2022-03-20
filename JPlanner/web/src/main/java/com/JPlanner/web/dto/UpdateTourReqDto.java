package com.JPlanner.web.dto;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import com.JPlanner.web.domain.Tour.Place;
import com.JPlanner.web.domain.Tour.Tour;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateTourReqDto {

	ArrayList<Tour> originTour;
	ArrayList<Tour> changedTour;
	
	public void setTimeToKST() {
		for(Tour tour : changedTour) {
			tour.setStartDateTime(ZonedDateTime.of(tour.getStartDateTime(), ZoneId.of("Asia/Seoul")).toLocalDateTime());
			tour.setArriveDateTime(ZonedDateTime.of(tour.getArriveDateTime(), ZoneId.of("Asia/Seoul")).toLocalDateTime());
			
			List<Place> places = tour.getPlaces();
			for(Place place : places) {
				place.setStartDateTime(ZonedDateTime.of(place.getStartDateTime(), ZoneId.of("Asia/Seoul")).toLocalDateTime());
			}
		}
	}
}
