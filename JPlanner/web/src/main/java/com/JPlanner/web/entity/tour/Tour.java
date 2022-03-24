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
	private String searchPriority;
	private LocalDateTime startDateTime;
	private LocalDateTime arriveDateTime;
	private LocalDateTime regDate;
	private LocalDateTime updateDate;
	private List<Place> places;
}
