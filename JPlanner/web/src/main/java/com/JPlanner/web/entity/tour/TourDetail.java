package com.JPlanner.web.entity.tour;

import java.time.LocalDateTime;

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
	private String search_priority;
	private LocalDateTime tourStartDateTime;
	private LocalDateTime tourArriveDateTime;
	private int place_tourId;
	private int placeIndicator;
	private int place_id;
	private String place_name;
	private String place_address;
	private double coord_x;
	private double coord_y;
	private int index;
	private LocalDateTime placeStartDateTime;
	private String stay_time;
}
