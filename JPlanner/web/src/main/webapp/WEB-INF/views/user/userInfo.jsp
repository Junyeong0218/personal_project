<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/security/tags" %>

<s:authorize access="isAuthenticated()">
	<s:authentication property="principal" var="principal" />
</s:authorize>

<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<title>캘린더 관리</title>
		<link rel="stylesheet" href="/css/main/main.css">
		<link rel="stylesheet" href="/css/signup.css">
		<link rel="stylesheet" href="/css/user/userinfo/userinfo.css">
	</head>
	
	<body>
	    <div id="container">
	        <aside>
			
			<div>
                <nav>
                    <div class="logo">
                        <a href="/main"><img src="/images/logo.png" alt="main_logo"></a>
                    </div>
                    <div class="user-info">
                        <div>
                        	<c:if test="${principal.user.image_type == null}">
                        		<img src="/images/userinfo/profile_image.png">
                        	</c:if>
                        	<c:if test="${principal.user.image_type != null}">
                        		<img src="/images/userinfo/${principal.user.username}/profile_image.${principal.user.image_type}">
                        	</c:if>
                        </div>
                        <span class="username">${principal.user.name} 님</span>
                        
                    </div>
                    <div class="menus">
                    	<div class="menu">
	                    	<button type="button"  onclick="confirmPw()"><span>회원정보 수정</span></button>
	                    	<span class="underbar"></span>
	                    </div>
                        <div class="menu">
	                    	<a href="#"></a>
	                    	<span class="underbar"></span>
	                    </div>
                        <div class="menu">
	                    	<a href="#"></a>
	                    	<span class="underbar"></span>
	                    </div>
	                    <div class="menu">
	                    	<a href="#"></a>
	                    	<span class="underbar"></span>
	                    </div>
	                    <div class="menu">
	                    	<a href="#"></a>
	                    	<span class="underbar"></span>
	                    </div>
                        <div class="menu">
							<button type="button" onclick="logout()"><span>로그아웃</span></button>
	                    	<span class="underbar"></span>
						</div>
                    </div>
                    
                </nav>
            </div>
		
		</aside>
	        
	        <main>
	        	
	        	<div id="formSelector">
	        		<button onclick="selectMB()" disabled>
	        			<span>기본 정보 변경</span>
	        		</button>
	        		<button onclick="selectMP()" style="cursor: pointer;">
	        			<span>비밀번호 변경</span>
	        		</button>
	        		<span id="selectorBar"></span>
	        	</div>
	        
		        <form action="/user/modifyUserInfo" method="post" enctype="multipart/form-data" id="modifyUserInfo">
				    <div>
				        <label>
				            <span>아이디</span>
				            <span>${principal.user.username}</span>
				        </label>
				        <label>
				            <span>이름</span>
				            <input type="text" name="name" required autocomplete="off" value="${principal.user.name}">
				        </label>
				        <div class="profile-image">
				            <span>프로필 이미지</span>
				            <div>
				            	<div>
				            		<c:if test="${principal.user.image_type == null}">
		                        		<img id="pre-img" src="/images/userinfo/profile_image.png">
		                        	</c:if>
		                        	<c:if test="${principal.user.image_type != null}">
		                        		<img id="pre-img" src="/images/userinfo/${principal.user.username}/profile_image.${principal.user.image_type}">
		                        	</c:if>
				            	</div>
				            	<label for="profile_image">파일 선택</label>
				            	<input type="file" accept="image/*" id="profile_image" name="file" class="hidden">
				        	</div>
				        </div>
				        <label class="question">
				            <span>비밀번호 찾기 질문</span>
				            
				            <select name="pw_question" required>
				            	
				            	<c:if test="${principal.user.pw_question == 1}"><option value="1" selected>ㅁㄴㅇㄹ</option></c:if>
				            	<c:if test="${principal.user.pw_question != 1}"><option value="1">ㅁㄴㅇㄹ</option></c:if>
				                
				                <c:if test="${principal.user.pw_question == 2}"><option value="2" selected>ㅁㄴㄹㅇ</option></c:if>
				            	<c:if test="${principal.user.pw_question != 2}"><option value="2">ㅁㄴㄹㅇ</option></c:if>
				                
				                <c:if test="${principal.user.pw_question == 3}"><option value="3" selected>ㅁㄴㄹㅇ</option></c:if>
				            	<c:if test="${principal.user.pw_question != 3}"><option value="3">ㅁㄴㄹㅇ</option></c:if>
				                
				                <c:if test="${principal.user.pw_question == 4}"><option value="4" selected>ㅁㄴㅇㄹ</option></c:if>
				            	<c:if test="${principal.user.pw_question != 4}"><option value="4">ㅁㄴㅇㄹ</option></c:if>
				            </select>
				        </label>
				        <label>
				            <span>답변</span>
				            <input type="text" name="pw_answer" required autocomplete="off" value="${principal.user.pw_answer}">
				        </label>
				    </div>
				    
				    <div class="btns">
				        <label class="submitBtn">
				            <button type="button">회원정보 수정</button>
				        </label>
				    </div>
				    
				</form>
				
				<form action="" method="post" id="modifyPw" class="hidden">
					<div>
						<label>
				            <span>아이디</span>
				            <span>${principal.user.username}</span>
				        </label>
				        <label>
				            <span>비밀번호</span>
				            <input type="password" id="password" name="password" oninput="checkPassword()" >
				        </label>
				        <label>
				            <span>비밀번호 확인</span>
				            <input type="password" name="pwConfirm" oninput="checkPassword()" >
				        </label>
				        <span id="wrongpw" class="hidden"></span>
					</div>
					
					<div id="btns">
				        <label id="submitBtn">
				            <button type="button" disabled><span>회원정보 수정</span></button>
				        </label>
				    </div>
				    
				</form>
				
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
		<script src="/js/widgetControl.js"></script>
		<script src="/js/user/userinfo/input_file_control.js"></script>
		<script src="/js/user/userinfo/validate_control.js"></script>
		<script src="/js/user/userinfo/change_form.js"></script>
		<script src="/js/user/userinfo/background_control.js"></script>
		<script src="/js/user/userinfo/modify_control.js"></script>
    	<script src="/js/menu_control.js"></script>
	</body>
</html>