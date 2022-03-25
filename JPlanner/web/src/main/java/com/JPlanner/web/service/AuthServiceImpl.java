package com.JPlanner.web.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.JPlanner.web.entity.user.User;
import com.JPlanner.web.entity.user.UserRepository;
import com.JPlanner.web.requestDto.SigninReqDto;
import com.JPlanner.web.requestDto.SignupReqDto;
import com.JPlanner.web.requestDto.UpdateUserReqDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
	
	private final UserRepository userRepository;
	
	@Override
	public int signup(SignupReqDto signupReqDto) {
		User user = signupReqDto.toEntity();
		user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
		
		int result = userRepository.signup(user);
		
		return result;
	}
	
	@Override
	public int checkUsername(String username) {
		int result = userRepository.selectUsernameByUsername(username);
		
		return result;
	}
	
	@Override
	public int checkPassword(SigninReqDto signinReqDto) {
		User user = signinReqDto.toEntityWithUsername();
		
		String encodedPassword = userRepository.checkPasswordbyUsername(user.getUsername());
		
		int result = new BCryptPasswordEncoder().matches(signinReqDto.getPassword(), encodedPassword) ? 1 : 0 ; 
		
		return result;
	}
	
	@Override
	public User selectUserByUsername(String username) {
		User user = userRepository.selectUserByUsername(username);
		
		return user;
	}
	
	@Override
	public User selectUserById(int id) {
		User user = userRepository.selectUserById(id);
		
		return user;
	}
	
	@Override
	public int updateUser(UpdateUserReqDto updateUserReqDto, User user) {
		int result = 0;
		
		if(updateUserReqDto.getFile() != null) {
			installProfileImage(updateUserReqDto, user);
		}
		result = userRepository.updateUserByUser(updateUserReqDto.toEntity());
		
		return result;
	}
	
	@Override
	public int updatePassword(SigninReqDto signinReqDto) {
		signinReqDto.setPassword(new BCryptPasswordEncoder().encode(signinReqDto.getPassword()));
		int result = userRepository.updatePasswordByUser(signinReqDto.toEntityWithId());
				
		return result;
	}
	
	private boolean installProfileImage(UpdateUserReqDto updateUserReqDto, User user) {
		String username = user.getUsername();
		String fileName = updateUserReqDto.getFile().getOriginalFilename();

		String imageType = fileName.substring(fileName.indexOf(".") + 1, fileName.length());

		String classPathFolder = new ClassPathResource("src/main/resources/static/images/userinfo/" + username).getPath();
		String absolutePathFolder = Paths.get(classPathFolder).toAbsolutePath().toString();
		
		Path imagePath = Paths.get(absolutePathFolder, "/profile_image." + imageType);
		
		File file = new File(absolutePathFolder);
		if(!file.exists()) {
			file.mkdirs();
		}
		
		try {
			Files.write(imagePath, updateUserReqDto.getFile().getBytes());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		updateUserReqDto.setImage_type(imageType);
		
		return true;
	}

}
