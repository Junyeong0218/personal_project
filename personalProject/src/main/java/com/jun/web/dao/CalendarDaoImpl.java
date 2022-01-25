package com.jun.web.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jun.web.domain.schedule.Schedule;

@Repository
public class CalendarDaoImpl implements CalendarDao {
	
	@Autowired
	private DataSource dataSource;
	
	@Override
	public List<Schedule> selectSchedulesByDates(List<Integer> dates, int id) {
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "SELECT * FROM schedule "
					+ "WHERE ((DATE(schedule.start_date) > DATE(?) AND DATE(schedule.start_date) < DATE(?)) "
					+ "OR (DATE(schedule.end_date) > DATE(?) AND DATE(schedule.end_date) < DATE(?))) "
					+ "and user_id = ? ORDER BY start_date";
		List<Schedule> schedules = new ArrayList<Schedule>();
		
		try {
			con = dataSource.getConnection();
			pstmt = con.prepareStatement(sql);
			
			pstmt.setInt(1, dates.get(0));
			pstmt.setInt(2, dates.get(dates.size()-1));
			pstmt.setInt(3, dates.get(0));
			pstmt.setInt(4, dates.get(dates.size()-1));
			pstmt.setInt(5, id);
			
			rs = pstmt.executeQuery();
			
			while(rs.next()) {
				Schedule schedule = new Schedule();
				schedule.setId(rs.getInt("id"));
				schedule.setTitle(rs.getString("title"));
				schedule.setDescription(rs.getString("description"));
				schedule.setStartDate(rs.getTimestamp("start_date").toLocalDateTime());
				schedule.setEndDate(rs.getTimestamp("end_date").toLocalDateTime());
				schedule.setRegDate(rs.getTimestamp("reg_date").toLocalDateTime());
				schedule.setUpdateDate(rs.getTimestamp("update_date").toLocalDateTime());
				
				schedules.add(schedule);
			}
			
			rs.close();
			pstmt.close();
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		System.out.println(schedules);
		
		return schedules;
	}
	
	@Override
	public Schedule getScheduleById(int id) {
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "SELECT * FROM schedule WHERE id = ?";
		Schedule schedule = null;
		
		try {
			con = dataSource.getConnection();
			pstmt = con.prepareStatement(sql);
			
			pstmt.setInt(1, id);
			
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

}
