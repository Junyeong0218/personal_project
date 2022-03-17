package com.JPlanner.web.dto;

import java.time.LocalDateTime;

import com.JPlanner.web.domain.schedule.Schedule;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateScheduleDto {

	private int id;
	private int type;
	private String title;
	private String startDate;
	private String endDate;
	private String description;
	
	public Schedule toEntity() {
		return Schedule.builder()
				.id(id)
				.type(type)
				.title(title)
				.startDate(LocalDateTime.parse(startDate))
				.endDate(LocalDateTime.parse(endDate))
				.description(description)
				.build();
	}
	
}