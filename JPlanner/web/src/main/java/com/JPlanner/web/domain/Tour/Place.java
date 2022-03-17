package com.JPlanner.web.domain.Tour;

import java.time.LocalDateTime;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Place {

	private int id;
	private int tourId;
	private int placeId;
	private String placeName;
	private String placeAddress;
	private double coordX;
	private double coordY;
	private int index;
	private LocalDateTime startDateTime;
	private LocalTime stayTime;
	private LocalDateTime regDate;
	private LocalDateTime updateDate;
}
