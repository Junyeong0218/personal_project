package com.jun.web.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jun.web.domain.user.User;

@Repository
public class UserDaoImpl implements UserDao {
	
	@Autowired
	private DataSource dataSource;

	@Override
	public int selectUsernameByUsername(String username) {
		
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "select count(*) from user_mst where username = ?";
		int result = 0;
		
		try {
			con = dataSource.getConnection();
			pstmt = con.prepareStatement(sql);
			
			pstmt.setString(1, username);
			
			rs = pstmt.executeQuery();
			
			if(rs.next()) {
				result = rs.getInt(1);
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return result;
	}
	
	@Override
	public int signin(User user) {
		
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "select count(um.username) + count(um2.password) from user_mst um "
					+ "left outer join user_mst um2 on(um.id = um2.id and um2.password = ?) "
					+ "where um.username = ?";
		int result = 0;
		
		try {
			con = dataSource.getConnection();
			pstmt = con.prepareStatement(sql);
			
			pstmt.setString(1, user.getPassword());
			pstmt.setString(2, user.getUsername());
			
			rs = pstmt.executeQuery();
			
			if(rs.next()) {
				result = rs.getInt(1);
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return result;
	}
	
	@Override
	public int signup(User user) {
		
		Connection con = null;
		PreparedStatement pstmt = null;
		String sql = "insert into user_mst values(0, ?, ?, ?, ?, ?, now(), now())";
		int result = 0;
		
		try {
			con = dataSource.getConnection();
			pstmt = con.prepareStatement(sql);
			
			pstmt.setString(1, user.getUsername());
			pstmt.setString(2, user.getPassword());
			pstmt.setString(3, user.getName());
			pstmt.setInt(4, user.getPwQuestion());
			pstmt.setString(5, user.getPwAnswer());
			
			result = pstmt.executeUpdate();
			
			pstmt.close();
			con.close();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return result;
	}
}
