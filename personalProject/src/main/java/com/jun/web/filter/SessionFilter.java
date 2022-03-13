package com.jun.web.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.jun.web.domain.user.User;

public class SessionFilter implements Filter{
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest req = (HttpServletRequest) request;
		
		String path = req.getServletPath();
		
		if(path.contains("index") || path.contains("signup") || path.contains("signin") || path.contains("js") || path.contains("css") || path.contains("check")) {
			chain.doFilter(request, response);
		} else {
			HttpSession session = req.getSession();
			User user = (User) session.getAttribute("user");
			
			if(user == null) {
				HttpServletResponse resp = (HttpServletResponse) response;
				resp.sendRedirect("/index");
			} else {
				chain.doFilter(request, response);
			}
		}
		
	}

}
