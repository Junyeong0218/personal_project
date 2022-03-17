package com.JPlanner.web.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.JPlanner.web.domain.Tour.Tour;

@Repository
public class TourDaoImpl implements TourDao {
	
	@Autowired
	private DataSource dataSource;

	@Override
	public List<Tour> getTourSchedulesById(int scheduleId, int userId) {
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "SELECT "
					+ " schedule.id AS scheduleId, "
					+ "	tm.id AS tourId, "
					+ "	tm.schedule_id, "
					+ "	tm.title, "
					+ "	tm.description, "
					+ "	tm.search_priority, "
					+ "	tm.start_datetime, "
					+ "	tm.arrive_datetime, "
					+ "	td.id AS placeIndicator, "
					+ "	td.place_id, "
					+ "	td.place_name, "
					+ "	td.place_address, "
					+ "	td.coord_x, "
					+ "	td.coord_y, "
					+ "	td.`index`, "
					+ "	td.start_datetime, "
					+ "	td.stay_time "
				+ "FROM "
					+ " schedule"
					+ "	LEFT OUTER JOIN daily_tour_mst tm ON(tm.schedule_id = schedule.id)"
					+ "	LEFT OUTER JOIN daily_tour_detail td ON(tm.id = td.daily_tour_id) "
				+ "WHERE "
					+ "schedule_id = ? "
				+ "ORDER BY "
					+ " tourId ASC, "
					+ "	td.start_datetime ASC";
		List<Tour> tours = null;
		
		try {
			con = dataSource.getConnection();
			pstmt = con.prepareStatement(sql);
			
			pstmt.setInt(1, scheduleId);
			
			rs = pstmt.executeQuery();
			
			tours = new ArrayList<Tour>
			while(rs.next()) {
				
			}
			
			rs.close();
			pstmt.close();
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return tours;
	}
}
