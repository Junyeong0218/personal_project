package com.JPlanner.web.config.auth;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.JPlanner.web.entity.user.User;
import com.JPlanner.web.entity.user.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PrincipalDetailService implements UserDetailsService {
	
	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User userEntity = userRepository.selectUserByUsername(username);
		System.out.println(userEntity);
		if(userEntity == null) {
			return null;
		} else {
			return new PrincipalDetails(userEntity);
		}
	}
}
