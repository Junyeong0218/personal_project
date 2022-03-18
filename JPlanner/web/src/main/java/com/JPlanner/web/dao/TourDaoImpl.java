package com.JPlanner.web.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.JPlanner.web.domain.Entity.TourDetail;

@Repository
public class TourDaoImpl implements TourDao {
	
	@Autowired
	private DataSource dataSource;

	@Override
	public List<TourDetail> getTourSchedulesById(int scheduleId, int userId) {
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
					+ "	tm.start_datetime AS tourStartDateTime, "
					+ "	tm.arrive_datetime AS tourArriveDateTime, "
					+ " td.daily_tour_id AS place_tourId, "
					+ "	td.id AS placeIndicator, "
					+ "	td.place_id, "
					+ "	td.place_name, "
					+ "	td.place_address, "
					+ "	td.coord_x, "
					+ "	td.coord_y, "
					+ "	td.`index`, "
					+ "	td.start_datetime placeStartDateTime, "
					+ "	td.stay_time "
				+ "FROM "
					+ " schedule"
					+ "	LEFT OUTER JOIN daily_tour_mst tm ON(tm.schedule_id = schedule.id)"
					+ "	LEFT OUTER JOIN daily_tour_detail td ON(tm.id = td.daily_tour_id) "
				+ "WHERE "
					+ "schedule.id = ? AND schedule.user_id = ? "
				+ "ORDER BY "
					+ " tourId ASC, "
					+ "	td.start_datetime ASC";
		List<TourDetail> tourDetails = null;
		
		try {
			con = dataSource.getConnection();
			pstmt = con.prepareStatement(sql);
			
			pstmt.setInt(1, scheduleId);
			pstmt.setInt(2, userId);
			
			rs = pstmt.executeQuery();
			
			tourDetails = new ArrayList<TourDetail>();
			while(rs.next()) {
				TourDetail tourDetail = new TourDetail();
				tourDetail.setScheduleId(rs.getInt("scheduleId"));
				tourDetail.setTourId(rs.getInt("tourId"));
				tourDetail.setTitle(rs.getString("title"));
				tourDetail.setDescription(rs.getString("description"));
				tourDetail.setSearchPriority(rs.getString("search_priority"));
				tourDetail.setTourStartDateTime(rs.getTimestamp("tourStartDateTime").toLocalDateTime());
				tourDetail.setTourArriveDateTime(rs.getTimestamp("tourArriveDateTime").toLocalDateTime());
				tourDetail.setPlace_tourId(rs.getInt("place_tourId"));
				tourDetail.setPlaceIndicator(rs.getInt("placeIndicator"));
				tourDetail.setPlaceId(rs.getInt("place_id"));
				tourDetail.setPlaceName(rs.getString("place_name"));
				tourDetail.setPlaceAddress(rs.getString("place_address"));
				tourDetail.setCoordX(rs.getString("coord_x") == null ? 0 : Double.parseDouble(rs.getString("coord_x")));
				tourDetail.setCoordY(rs.getString("coord_y") == null ? 0 : Double.parseDouble(rs.getString("coord_y")));
				tourDetail.setIndex(rs.getInt("index"));
				tourDetail.setPlaceStartDateTime(rs.getTimestamp("placeStartDateTime") == null ? LocalDateTime.MIN : rs.getTimestamp("placeStartDateTime").toLocalDateTime());
				tourDetail.setStayTime(rs.getTime("stay_time") == null ? LocalTime.MIN : rs.getTime("stay_time").toLocalTime());
				
				tourDetails.add(tourDetail);
			}
			
			rs.close();
			pstmt.close();
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return tourDetails;
	}
}
