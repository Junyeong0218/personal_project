package com.JPlanner.web.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import com.JPlanner.web.config.DBConfig;
import com.JPlanner.web.domain.user.User;

public class UserDaoImpl implements UserDao {
	

	private DBConfig dataSource;
	
	@Override
	public int signup(User user) {
		
		Connection con = null;
		PreparedStatement pstmt = null;
		String sql = "insert into user_mst values(0, ?, ?, ?, ?, ?, NULL, now(), now(), 0, 'ROLE_USER')";
		int result = 0;
		
		try {
			con = dataSource.dataSource().getConnection();
			pstmt = con.prepareStatement(sql);
			
			pstmt.setString(1, user.getUsername());
			pstmt.setString(2, new BCryptPasswordEncoder().encode(user.getPassword()));
			pstmt.setString(3, user.getName());
			pstmt.setInt(4, user.getPwQuestion());
			pstmt.setString(5, user.getPwAnswer());
			
			result = pstmt.executeUpdate();
			
			pstmt.close();
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	@Override
	public int selectUsernameByUsername(String username) {
		
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "select count(*) from user_mst where username = ?";
		int result = 0;
		
		try {
			con = dataSource.dataSource().getConnection();
			pstmt = con.prepareStatement(sql);
			
			pstmt.setString(1, username);
			
			rs = pstmt.executeQuery();
			
			if(rs.next()) {
				result = rs.getInt(1);
			}
			
			rs.close();
			pstmt.close();
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	@Override
	public User selectUserById(int id) {
		
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "select * from user_mst where id = ?";
		User user = null;
		
		try {
			con = dataSource.dataSource().getConnection();
			pstmt = con.prepareStatement(sql);
			
			pstmt.setInt(1, id);
			
			rs = pstmt.executeQuery();
			
			if(rs.next()) {
				user = new User();
				
				user.setId(rs.getInt("id"));
				user.setUsername(rs.getString("username"));
				user.setPassword(rs.getString("password"));
				user.setName(rs.getString("name"));
				user.setPwQuestion(rs.getInt("pw_question"));
				user.setPwAnswer(rs.getString("pw_answer"));
				user.setImgType(rs.getString("image_type"));
				user.setRole(rs.getString("role"));
			}
			
			rs.close();
			pstmt.close();
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return user;
	}
	
	@Override
	public User selectUserByUsername(String username) {
		
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "select * from user_mst where username = ?";
		User user = null;
		
		try {
			con = dataSource.dataSource().getConnection();
			pstmt = con.prepareStatement(sql);
			
			pstmt.setString(1, username);
			
			rs = pstmt.executeQuery();
			
			if(rs.next()) {
				user = new User();
				
				user.setId(rs.getInt("id"));
				user.setUsername(rs.getString("username"));
				user.setPassword(rs.getString("password"));
				user.setName(rs.getString("name"));
				user.setPwQuestion(rs.getInt("pw_question"));
				user.setPwAnswer(rs.getString("pw_answer"));
				user.setImgType(rs.getString("image_type"));
				user.setRole(rs.getString("role"));
			}
			
			rs.close();
			pstmt.close();
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return user;
	}
	
	@Override
	public int updateUserByUser(User user) {
		
		Connection con = null;
		PreparedStatement pstmt = null;
		String sql = "";
		int result = 0;
		
		try {
			con = dataSource.dataSource().getConnection();
			
			if(user.getFile() == null) {
				sql = "update user_mst set name = ?, pw_question = ?, pw_answer = ?, image_type = NULL, update_date = now() where id = ?";
				
				pstmt = con.prepareStatement(sql);

				pstmt.setString(1, user.getName());
				pstmt.setInt(2, user.getPwQuestion());
				pstmt.setString(3, user.getPwAnswer());
				pstmt.setInt(4, user.getId());
				
				result = pstmt.executeUpdate();
				
			} else {
				sql = "update user_mst set name = ?, pw_question = ?, pw_answer = ?, image_type = ?, update_date = now() where id = ?";
				
				pstmt = con.prepareStatement(sql);

				pstmt.setString(1, user.getName());
				pstmt.setInt(2, user.getPwQuestion());
				pstmt.setString(3, user.getPwAnswer());
				pstmt.setString(4, user.getImgType());
				pstmt.setInt(5, user.getId());
				
				result = pstmt.executeUpdate();
			}
			
			pstmt.close();
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	@Override
	public int updatePasswordByUser(User user) {
		
		Connection con = null;
		PreparedStatement pstmt = null;
		String sql = "update user_mst set password = ?, update_date = now() where id = ?";
		int result = 0;
		
		try {
			con = dataSource.dataSource().getConnection();
			pstmt = con.prepareStatement(sql);

			pstmt.setString(1, user.getPassword());
			pstmt.setInt(2, user.getId());
			
			result = pstmt.executeUpdate();
			
			pstmt.close();
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
}
