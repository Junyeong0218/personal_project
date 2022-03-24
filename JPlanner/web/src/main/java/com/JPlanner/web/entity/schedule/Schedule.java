package com.JPlanner.web.entity.schedule;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Schedule {

	private int id;
	private String title;
	private String description;
	private LocalDateTime startDate;
	private LocalDateTime endDate;
	private LocalDateTime regDate;
	private LocalDateTime updateDate;
	private int userId;
	private boolean oneday;
	private boolean firstday;
	private boolean lastday;
	private boolean middleday;
	private int rowNum;
	private int type;
	
}
