package com.JPlanner.web.entity.schedule;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleOneMonth {

	int firstDate;
	int lastDate;
	int userId;
}
