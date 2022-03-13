package com.JPlanner.web.dto;

import java.time.LocalDateTime;

import com.JPlanner.web.domain.schedule.Schedule;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InsertScheduleDto {

	private String title;
	private String startDate;
	private String endDate;
	private String description;
	
	public Schedule toEntity() {
		return Schedule.builder()
				.title(title)
				.startDate(LocalDateTime.parse(startDate))
				.endDate(LocalDateTime.parse(endDate))
				.description(description)
				.build();
	}
	
}
