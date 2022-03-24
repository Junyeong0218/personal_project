package com.JPlanner.web.requestDto;

import java.util.ArrayList;

import com.JPlanner.web.entity.tour.Tour;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateTourReqDto {

	ArrayList<Tour> originTour;
	ArrayList<Tour> changedTour;
}
