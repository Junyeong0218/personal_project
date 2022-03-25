package com.JPlanner.web.entity.tour;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tour {

	private int id;
	private int scheduleId;
	private String title;
	private String description;
	private String search_priority;
	private LocalDateTime start_datetime;
	private LocalDateTime arrive_datetime;
	private LocalDateTime reg_date;
	private LocalDateTime update_date;
	private List<Place> places;
}
