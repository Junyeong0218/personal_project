package com.JPlanner.web.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Repository;

import com.JPlanner.web.domain.schedule.Schedule;

@Repository
@EnableAutoConfiguration
public class CalendarDaoImpl implements CalendarDao {
	
	@Autowired
	private DataSource dataSource;
	
	@Override
	public List<Schedule> selectSchedulesByDates(List<Integer> dates, int userId) {
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "SELECT id, title, description, start_date, end_date FROM schedule "
					+ "WHERE ((DATE(schedule.start_date) > DATE(?) AND DATE(schedule.start_date) < DATE(?)) "
					+ "OR (DATE(schedule.end_date) > DATE(?) AND DATE(schedule.end_date) < DATE(?))) "
					+ "and user_id = ? and deleted = 0 ORDER BY start_date asc, end_date desc, id asc";
		List<Schedule> schedules = new ArrayList<Schedule>();
		
		try {
			con = dataSource.getConnection();
			pstmt = con.prepareStatement(sql);
			
			pstmt.setInt(1, dates.get(0));
			pstmt.setInt(2, dates.get(dates.size()-1));
			pstmt.setInt(3, dates.get(0));
			pstmt.setInt(4, dates.get(dates.size()-1));
			pstmt.setInt(5, userId);
			
			rs = pstmt.executeQuery();
			
			while(rs.next()) {
				Schedule schedule = new Schedule();
				schedule.setId(rs.getInt("id"));
				schedule.setTitle(rs.getString("title"));
				schedule.setDescription(rs.getString("description"));
				schedule.setStartDate(rs.getTimestamp("start_date").toLocalDateTime());
				schedule.setEndDate(rs.getTimestamp("end_date").toLocalDateTime());
				
				schedules.add(schedule);
			}
			
			rs.close();
			pstmt.close();
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return schedules;
	}
	
	@Override
	public Schedule getScheduleById(int scheduleId) {
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "SELECT * FROM schedule WHERE id = ?";
		Schedule schedule = null;
		
		try {
			con = dataSource.getConnection();
			pstmt = con.prepareStatement(sql);
			
			pstmt.setInt(1, scheduleId);
			
			rs = pstmt.executeQuery();
			
			while(rs.next()) {
				schedule = new Schedule();
				schedule.setId(rs.getInt("id"));
				schedule.setTitle(rs.getString("title"));
				schedule.setDescription(rs.getString("description"));
				schedule.setStartDate(rs.getTimestamp("start_date").toLocalDateTime());
				schedule.setEndDate(rs.getTimestamp("end_date").toLocalDateTime());
			}
			
			rs.close();
			pstmt.close();
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return schedule;
	}
	
	@Override
	public List<Schedule> getScheduleListByYearMonth(int yearmonth, int userId) {
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "SELECT * FROM `schedule` "
					+ "WHERE date(start_date) <= DATE(?) AND date(end_date) >= DATE(?) AND user_id = ? AND deleted = 0 "
					+ "ORDER BY start_date asc;";
		List<Schedule> scheduleList = new ArrayList<Schedule>();
		
		try {
			con = dataSource.getConnection();
			pstmt = con.prepareStatement(sql);
			
			pstmt.setInt(1, yearmonth);
			pstmt.setInt(2, yearmonth);
			pstmt.setInt(3, userId);
			
			rs = pstmt.executeQuery();
			
			while(rs.next()) {
				Schedule schedule = new Schedule();
				schedule.setId(rs.getInt("id"));
				schedule.setTitle(rs.getString("title"));
				schedule.setStartDate(rs.getTimestamp("start_date").toLocalDateTime());
				schedule.setEndDate(rs.getTimestamp("end_date").toLocalDateTime());
				
				scheduleList.add(schedule);
			}
			
			rs.close();
			pstmt.close();
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return scheduleList;
	}
	
	@Override
	public int insertScheduleBySchedule(Schedule schedule, int userId) {
		Connection con = null;
		PreparedStatement pstmt = null;
		String sql = "insert into schedule values(0, ?, ?, ?, ?, now(), now(), ?, 0)";
		int result = 0;
		
		try {
			con = dataSource.getConnection();
			pstmt = con.prepareStatement(sql);
			
			pstmt.setString(1, schedule.getTitle());
			pstmt.setString(2, schedule.getDescription());
			pstmt.setTimestamp(3, Timestamp.valueOf(schedule.getStartDate()));
			pstmt.setTimestamp(4, Timestamp.valueOf(schedule.getEndDate()));
			pstmt.setInt(5, userId);
			
			result = pstmt.executeUpdate();
			
			pstmt.close();
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	@Override
	public int updateScheduleBySchedule(Schedule schedule, int userId) {
		Connection con = null;
		PreparedStatement pstmt = null;
		String sql = "update schedule set title = ?, start_date = ?, end_date = ?, description = ?, update_date = now() where id = ? and user_id = ?";
		int result = 0;
		
		try {
			con = dataSource.getConnection();
			pstmt = con.prepareStatement(sql);
			
			pstmt.setString(1, schedule.getTitle());
			pstmt.setTimestamp(2, Timestamp.valueOf(schedule.getStartDate()));
			pstmt.setTimestamp(3, Timestamp.valueOf(schedule.getEndDate()));
			pstmt.setString(4, schedule.getDescription());
			pstmt.setInt(5, schedule.getId());
			pstmt.setInt(6, userId);
			
			result = pstmt.executeUpdate();
			
			pstmt.close();
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	@Override
	public int deleteScheduleById(int scheduleId) {
		Connection con = null;
		PreparedStatement pstmt = null;
		String sql = "update schedule set deleted = 1, update_date = now() where id = ?";
		int result = 0;
		
		try {
			con = dataSource.getConnection();
			pstmt = con.prepareStatement(sql);
			
			pstmt.setInt(1, scheduleId);
			
			result = pstmt.executeUpdate();
			
			pstmt.close();
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}

}
