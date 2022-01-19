<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
    	<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>캘린더 관리</title>
		<link rel="stylesheet" href="/css/main/main.css">
		<link rel="stylesheet" href="/css/user/userinfo/checkpassword.css">
	</head>
	<body>
		<div id="container">
	        <header>
	            <div>
	                <nav>
	                    <div class="logo">
	                        <a href="/main"><img src="/images/logo.png" alt="main_logo"></a>
	                    </div>
	                    <div class="menu">
	                        <a href="#"><img src="#" alt=""></a>
	                        <a href="#"><img src="#" alt=""></a>
	                        <a href="#"><img src="#" alt=""></a>
	                        <a href="#"><img src="#" alt=""></a>
	                    </div>
	                    <div class="user-info">
	                        <span class="username">${sessionScope.user.name} 님</span>
	                        <button type="button" onclick="toggleWidget()"><img src="/images/userinfo/${sessionScope.user.username}/profile_image.png"></button>
	                    </div>
	                    <div id="user-widget" class="user-widget hide">
	                    	<div class="user-desc">
	                    		<span class="username">${sessionScope.user.name} 님</span>
	                    		<div>-------------------------</div>
	                    		<span class="user-id">아이디 : ${sessionScope.user.username}</span>
	                    		<span class="create-date">가입일 : 
	                    			<fmt:parseDate var="parsedDate" pattern="yyyy-MM-dd'T'HH:mm:ss" value="${sessionScope.user.createDate}" type="both"/>
									<fmt:formatDate value="${parsedDate}" pattern="yyyy-MM-dd"/>
	                    		</span>
	                    		<div class="widget-btns">
	                    			<button type="button" onclick="confirmPw()"><span>수정하기</span></button>
	                    			<button type="button" onclick="logout()"><span>로그아웃</span></button>
	                    		</div>
	                    	</div>
	                    </div>
	                </nav>
	            </div>
	
	        </header>
	        
	        <main>
	        
	        	<div>
	        		<form class="check-form" action="javascript:checkPw()">
	        			<span>현재 비밀번호를 입력해주세요.</span>
	        			<input id="password" class="password" type="password" name="password">
	        			<button type="submit">확인</button>
	        		</form>
	        	</div>
	        	
	        	<div class="pop-up-bg">
		            <div class="pop-up-win">
		            	<div class="pop-up">
							<span id="message"></span>
							<button id="closeBtn" type="button" onclick="closePopUp()">close</button>
						</div>
		            </div>
				</div>
	        
	        </main>
		</div>
		<script src="/js/jquery-3.6.0.min.js"></script>
		<script src="/js/user/checkpassword/background_control.js"></script>
		<script src="/js/user/checkpassword/popup_control.js"></script>
    	<script src="/js/widgetControl.js"></script>
	</body>
</html>