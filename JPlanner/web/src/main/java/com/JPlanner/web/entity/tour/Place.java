package com.JPlanner.web.entity.tour;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Place {

	private int id;
	private int tourId;
	private int place_id;
	private String place_name;
	private String place_address;
	private double coord_x;
	private double coord_y;
	private int index;
	private LocalDateTime start_datetime;
	private String stay_time;
	private LocalDateTime reg_date;
	private LocalDateTime update_date;
}
