package com.JPlanner.web.domain.Entity;

import java.time.LocalDateTime;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TourDetail {

	private int scheduleId;
	private int tourId;
	private String title;
	private String description;
	private String searchPriority;
	private LocalDateTime tourStartDateTime;
	private LocalDateTime tourArriveDateTime;
	private int place_tourId;
	private int placeIndicator;
	private int placeId;
	private String placeName;
	private String placeAddress;
	private double coordX;
	private double coordY;
	private int index;
	private LocalDateTime placeStartDateTime;
	private LocalTime stayTime;
}
