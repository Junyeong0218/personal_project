package com.JPlanner.web.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Repository;

import com.JPlanner.web.domain.user.User;
import com.JPlanner.web.dto.UpdatePasswordDto;
import com.JPlanner.web.dto.UpdateUserInfoDto;

@Repository
@EnableAutoConfiguration
public class UserDaoImpl implements UserDao {
	
	@Autowired
	private DataSource dataSource;
	
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
			
			rs.close();
			pstmt.close();
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	@Override
	public int signup(User user) {
		
		Connection con = null;
		PreparedStatement pstmt = null;
		String sql = "insert into user_mst values(0, ?, ?, ?, ?, ?, NULL, now(), now(), 0)";
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
			con = dataSource.getConnection();
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
			con = dataSource.getConnection();
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
				user.setCreateDate(rs.getTimestamp("create_date").toLocalDateTime());
				user.setUpdateDate(rs.getTimestamp("update_date").toLocalDateTime());
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
			con = dataSource.getConnection();
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
				user.setCreateDate(rs.getTimestamp("create_date").toLocalDateTime());
				user.setUpdateDate(rs.getTimestamp("update_date").toLocalDateTime());
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
	public int updateUserByDto(UpdateUserInfoDto updateUserInfoDto) {
		
		Connection con = null;
		PreparedStatement pstmt = null;
		String sql = "";
		int result = 0;
		
		try {
			con = dataSource.getConnection();
			
			if(updateUserInfoDto.getFile() == null) {
				sql = "update user_mst set name = ?, pw_question = ?, pw_answer = ?, image_type = NULL, update_date = now() where id = ?";
				
				pstmt = con.prepareStatement(sql);

				pstmt.setString(1, updateUserInfoDto.getName());
				pstmt.setInt(2, updateUserInfoDto.getQuestion());
				pstmt.setString(3, updateUserInfoDto.getAnswer());
				pstmt.setInt(4, updateUserInfoDto.getId());
				
				result = pstmt.executeUpdate();
				
			} else {
				sql = "update user_mst set name = ?, pw_question = ?, pw_answer = ?, image_type = ?, update_date = now() where id = ?";
				
				pstmt = con.prepareStatement(sql);

				pstmt.setString(1, updateUserInfoDto.getName());
				pstmt.setInt(2, updateUserInfoDto.getQuestion());
				pstmt.setString(3, updateUserInfoDto.getAnswer());
				pstmt.setString(4, updateUserInfoDto.getImgType());
				pstmt.setInt(5, updateUserInfoDto.getId());
				
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
	public int updatePasswordByPassword(UpdatePasswordDto updatePasswordDto) {
		
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "update user_mst set password = ?, update_date = now() where id = ?";
		int result = 0;
		
		try {
			con = dataSource.getConnection();
			pstmt = con.prepareStatement(sql);

			pstmt.setString(1, updatePasswordDto.getPassword());
			pstmt.setInt(2, updatePasswordDto.getId());
			
			result = pstmt.executeUpdate();
			
			pstmt.close();
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
}
