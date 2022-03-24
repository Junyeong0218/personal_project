package com.JPlanner.web.requestDto;

import java.time.LocalDateTime;

import com.JPlanner.web.entity.schedule.Schedule;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InsertScheduleReqDto {

	private String title;
	private String startDate;
	private String endDate;
	private String description;
	private int type;
	
	public Schedule toEntity() {
		return Schedule.builder()
					   .title(title)
					   .startDate(LocalDateTime.parse(startDate))
					   .endDate(LocalDateTime.parse(endDate))
					   .description(description)
					   .type(type)
					   .build();
	}
	
}
