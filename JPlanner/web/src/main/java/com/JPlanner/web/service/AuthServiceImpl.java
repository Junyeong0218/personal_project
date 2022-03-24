package com.JPlanner.web.service;

import java.io.IOException;

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
	private final FileService fileService;
	
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
		
		String password = userRepository.checkPasswordbyUsername(user.getUsername());
		
		return new BCryptPasswordEncoder().matches(signinReqDto.getPassword(), password) ? 1 : 0 ;
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
	public int updateUser(UpdateUserReqDto updateUserReqDto) {
		int result = userRepository.updateUserByUserWithoutImage(updateUserReqDto.toEntity());
		
		return result;
	}
	
	@Override
	public int updateUser(UpdateUserReqDto updateUserReqDto, String url) throws IOException {
		boolean uploadFlag = fileService.setProfileImage(updateUserReqDto.getFile(), updateUserReqDto.getImgType(), url);
		int result = -1;
		
		if(uploadFlag) {
			result = userRepository.updateUserByUserWithImage(updateUserReqDto.toEntity());
		}
		
		return result;
	}
	
	@Override
	public int updatePassword(SigninReqDto signinReqDto) {
		int result = userRepository.updatePasswordByUser(signinReqDto.toEntityWithId());
				
		return result;
	}
	
//	private boolean installProfileImage(MultipartFile file, String extension, String url) {
//		boolean uploadFlag = false;
//
//		String fileName = file.getOriginalFilename();
//		
//		File tempFile = new File(url);
//		if(!tempFile.exists()) {
//			tempFile.mkdirs();
//		}
//		
//		System.out.println(url);
//		
//		InputStream fis = file.getInputStream();
//		String filePath = url + SEP + "profile_image." + extension;
//		FileOutputStream fos = new FileOutputStream(filePath);
//
//		byte[] buf = new byte[1024];
//		int size = 0;
//		while( (size = fis.read(buf)) != (-1) ) {
//			fos.write(buf, 0, size);
//		}
//		
//		uploadFlag = true;
//			
//		fis.close();
//		fos.close();
//		
//		return uploadFlag;
//		
//		return false;
//	}

}
