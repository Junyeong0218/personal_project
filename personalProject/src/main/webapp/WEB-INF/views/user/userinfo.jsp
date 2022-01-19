<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<title>캘린더 관리</title>
		<link rel="stylesheet" href="/css/main/main.css">
		<link rel="stylesheet" href="/css/user/signup/signup.css">
		<link rel="stylesheet" href="/css/user/userinfo/userinfo.css">
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
	                    			<button type="button"  onclick="confirmPw()"><span>수정하기</span></button>
	                    			<button type="button" onclick="logout()"><span>로그아웃</span></button>
	                    		</div>
	                    	</div>
	                    </div>
	                </nav>
	            </div>
	
	        </header>
	        
	        <main>
	        
		        <form action="/user/userinfo" method="post" enctype="multipart/form-data">
				    <div>
				        <label>
				            <span>아이디</span>
				            <span>${sessionScope.user.username}</span>
				        </label>
				        <label>
				            <span>비밀번호</span>
				            <input type="password" name="password" oninput="checkPassword()" >
				        </label>
				        <label>
				            <span>비밀번호 확인</span>
				            <input type="password" name="pwConfirm" oninput="checkPassword()" >
				        </label>
				        <span id="wrongpw" class="hidden"></span>
				        <label>
				            <span>이름</span>
				            <input type="text" name="name" required autocomplete="off" value="${sessionScope.user.name}">
				        </label>
				        <%-- <div class="profile-image">
				            <span>프로필 이미지</span>
				            <div>
				            	<div>
				            		<img id="pre-img" src="/images/userinfo/${sessionScope.user.username}/profile_image.png" alt="profileImage">
				            	</div>
				            	<label for="profile_image">파일 선택</label>
				            	<input type="file" accept="image/*" id="profile_image" name="file" class="hidden">
				        	</div>
				        </div> --%>
				        <label class="question">
				            <span>비밀번호 찾기 질문</span>
				            
				            <select name="question" required>
				            	
				            	<c:if test="${sessionScope.user.pwQuestion == 1}"><option value="1" selected>ㅁㄴㅇㄹ</option></c:if>
				            	<c:if test="${sessionScope.user.pwQuestion != 1}"><option value="1">ㅁㄴㅇㄹ</option></c:if>
				                
				                <c:if test="${sessionScope.user.pwQuestion == 2}"><option value="2" selected>ㅁㄴㄹㅇ</option></c:if>
				            	<c:if test="${sessionScope.user.pwQuestion != 2}"><option value="2">ㅁㄴㄹㅇ</option></c:if>
				                
				                <c:if test="${sessionScope.user.pwQuestion == 3}"><option value="3" selected>ㅁㄴㄹㅇ</option></c:if>
				            	<c:if test="${sessionScope.user.pwQuestion != 3}"><option value="3">ㅁㄴㄹㅇ</option></c:if>
				                
				                <c:if test="${sessionScope.user.pwQuestion == 4}"><option value="4" selected>ㅁㄴㅇㄹ</option></c:if>
				            	<c:if test="${sessionScope.user.pwQuestion != 4}"><option value="4">ㅁㄴㅇㄹ</option></c:if>
				            </select>
				        </label>
				        <label>
				            <span>답변</span>
				            <input type="text" name="answer" required autocomplete="off" value="${sessionScope.user.pwAnswer}">
				        </label>
				    </div>
				    
				    <div id=btns>
				        <label id="submitBtn">
				            <button type="submit" disabled>회원정보 수정</button>
				        </label>
				    </div>
				    
				</form>
	        
	        </main>
		</div>
		<script src="/js/user/userinfo/background_control.js"></script>
		<script src="/js/widgetControl.js"></script>
		<script src="/js/user/userinfo/input_file_control.js"></script>
		<script src="/js/user/userinfo/validate_control.js"></script>
	</body>
</html>