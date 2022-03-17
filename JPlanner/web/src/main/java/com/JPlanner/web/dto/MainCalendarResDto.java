package com.JPlanner.web.dto;

import java.util.List;
import java.util.Map;

import com.JPlanner.web.domain.schedule.Schedule;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MainCalendarResDto {

	List<Integer> dates;
	Map<Integer, List<Schedule>> schedules;
}
