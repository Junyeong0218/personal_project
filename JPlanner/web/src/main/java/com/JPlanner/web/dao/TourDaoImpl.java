package com.JPlanner.web.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.JPlanner.web.domain.Entity.TourDetail;
import com.JPlanner.web.domain.Tour.Place;
import com.JPlanner.web.domain.Tour.Tour;

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
					+ "schedule.id = ? AND schedule.user_id = ? AND td.deleted = 0 "
				+ "ORDER BY "
					+ " tourId ASC, "
					+ " td.`index` ASC ";
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
				tourDetail.setTitle(rs.getString("title") == null ? "" : rs.getString("title"));
				tourDetail.setDescription(rs.getString("description") == null ? "" : rs.getString("description"));
				tourDetail.setSearchPriority(rs.getString("search_priority") == null ? "RECOMMEND" : rs.getString("search_priority"));
				tourDetail.setTourStartDateTime(rs.getTimestamp("tourStartDateTime").toLocalDateTime());
				tourDetail.setTourArriveDateTime(rs.getTimestamp("tourArriveDateTime").toLocalDateTime());
				tourDetail.setPlace_tourId(rs.getInt("place_tourId"));
				tourDetail.setPlaceIndicator(rs.getInt("placeIndicator"));
				tourDetail.setPlaceId(rs.getInt("place_id"));
				tourDetail.setPlaceName(rs.getString("place_name") == null ? "" : rs.getString("place_name"));
				tourDetail.setPlaceAddress(rs.getString("place_address") == null ? "" : rs.getString("place_address"));
				tourDetail.setCoordX(rs.getString("coord_x") == null ? 0 : Double.parseDouble(rs.getString("coord_x")));
				tourDetail.setCoordY(rs.getString("coord_y") == null ? 0 : Double.parseDouble(rs.getString("coord_y")));
				tourDetail.setIndex(rs.getInt("index"));
				tourDetail.setPlaceStartDateTime(rs.getTimestamp("placeStartDateTime") == null ? LocalDateTime.MIN : rs.getTimestamp("placeStartDateTime").toLocalDateTime());
				tourDetail.setStayTime(rs.getString("stay_time") == null ? "00:00:00" : rs.getString("stay_time"));
				
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
	
	@Override
	public int insertTourByTour(Tour tour) {
		Connection con = null;
		PreparedStatement pstmt = null;
		String sql = "INSERT INTO daily_tour_mst VALUES(0, ?, ?, ?, ?, ?, ?, NOW(), NOW(), 0, null)";
		int result = 0;
		
		try {
			con = dataSource.getConnection();
			pstmt = con.prepareStatement(sql);
			
			pstmt.setInt(1, tour.getScheduleId());
			pstmt.setString(2, tour.getTitle());
			pstmt.setString(3, tour.getDescription());
			pstmt.setString(4, tour.getSearchPriority());
			pstmt.setTimestamp(5, Timestamp.valueOf(tour.getStartDateTime()));
			pstmt.setTimestamp(6, Timestamp.valueOf(tour.getArriveDateTime()));
			
			result = pstmt.executeUpdate();
			
			pstmt.close();
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	@Override
	public int selectTourIdByTour(Tour tour) {
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "SELECT "
						+ " id "
					+ "FROM "
						+ " daily_tour_mst "
					+ "WHERE "
						+ "schedule_id = ? AND deleted = 0 "
					+ "ORDER BY "
						+ " reg_date DESC ";
		int tourId = 0;
		
		try {
			con = dataSource.getConnection();
			pstmt = con.prepareStatement(sql);
			
			pstmt.setInt(1, tour.getScheduleId());
			
			rs = pstmt.executeQuery();
			
			while(rs.next()) {
				tourId = rs.getInt("id");
			}
			
			rs.close();
			pstmt.close();
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return tourId;
	}
	
	@Override
	public int updateTourByTour(Tour tour) {
		Connection con = null;
		PreparedStatement pstmt = null;
		String sql = "UPDATE "
					   + "daily_tour_mst "
				   + "SET "
				   	   + "search_priority = ?, "
				   	   + "start_datetime = ?, "
				   	   + "arrive_datetime = ?, "
				   	   + "update_date = now() "
				   + "WHERE "
				       + "id = ? ";
		int result = 0;
		
		try {
			con = dataSource.getConnection();
			pstmt = con.prepareStatement(sql);
			
			pstmt.setString(1, tour.getSearchPriority());
			pstmt.setTimestamp(2, Timestamp.valueOf(tour.getStartDateTime()));
			pstmt.setTimestamp(3, Timestamp.valueOf(tour.getArriveDateTime()));
			pstmt.setInt(4, tour.getId());
			
			result = pstmt.executeUpdate();
			
			pstmt.close();
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	@Override
	public int updatePlaceByPlace(Place place) {
		Connection con = null;
		PreparedStatement pstmt = null;
		String sql = "UPDATE "
					   + "daily_tour_detail "
				   + "SET "
				   	   + "`index` = ?, "
				   	   + "start_datetime = ?, "
				   	   + "stay_time = ?, "
				   	   + "update_date = now() "
				   + "WHERE "
				       + "id = ? ";
		int result = 0;
		
		try {
			con = dataSource.getConnection();
			pstmt = con.prepareStatement(sql);
			
			pstmt.setInt(1, place.getIndex());
			pstmt.setTimestamp(2, Timestamp.valueOf(place.getStartDateTime()));
			pstmt.setString(3, place.getStayTime().toString());
			pstmt.setInt(4, place.getId());
			
			result = pstmt.executeUpdate();
			
			pstmt.close();
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	@Override
	public int insertPlaceByPlace(Place place) {
		Connection con = null;
		PreparedStatement pstmt = null;
		String sql = "INSERT INTO daily_tour_detail VALUES(0, ?, ?, ?, ?, ?, ?, ?, ? , ? , NOW(), NOW(), 0, null)";
		int result = 0;
		
		try {
			con = dataSource.getConnection();
			pstmt = con.prepareStatement(sql);
			
			pstmt.setInt(1, place.getTourId());
			pstmt.setString(2, Integer.toString(place.getPlaceId()));
			pstmt.setString(3, place.getPlaceName());
			pstmt.setString(4, place.getPlaceAddress());
			pstmt.setString(5, Double.toString(place.getCoordX()));
			pstmt.setString(6, Double.toString(place.getCoordY()));
			pstmt.setInt(7, place.getIndex());
			pstmt.setTimestamp(8, Timestamp.valueOf(place.getStartDateTime()));
			pstmt.setString(9, place.getStayTime().toString());
			
			result = pstmt.executeUpdate();
			
			pstmt.close();
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	@Override
	public int deletePlaceByPlaceId(int placeId) {
		Connection con = null;
		PreparedStatement pstmt = null;
		String sql = "UPDATE "
					   + "daily_tour_detail "
				   + "SET "
				   	   + "deleted = 1,"
				   	   + "deleted_datetime = now() "
				   + "WHERE "
				       + "id = ? ";
		int result = 0;
		
		try {
			con = dataSource.getConnection();
			pstmt = con.prepareStatement(sql);
			
			pstmt.setInt(1, placeId);
			
			result = pstmt.executeUpdate();
			
			pstmt.close();
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
}
