<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="chrome">
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Expires" CONTENT="-1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>캘린더 관리</title>
    <link rel="stylesheet" href="/css/main/main.css">
    <link rel="stylesheet" href="/css/main/popup.css">
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
                        	<c:if test="${sessionScope.user.imgType == null}">
                        		<img src="/images/userinfo/profile_image.png">
                        	</c:if>
                        	<c:if test="${sessionScope.user.imgType != null}">
                        		<img src="/images/userinfo/${sessionScope.user.username}/profile_image.${sessionScope.user.imgType}">
                        	</c:if>
                        </div>
                        <span class="username">${sessionScope.user.name} 님</span>
                        
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
            <!--캘린더 -->
            
            <div id="calendar">
            
	            <div id="month">
	            	<button type="button" onclick="setPrevMonth()"><span>◀</span></button>
	            	<input type="month" id="monthSelector" onchange="changeMonth(event)">
	            	<button type="button" onclick="setNextMonth()"><span>▶</span></button>
	            </div>
	            
	            <table>
	            	
	            	<tr>
	            		<th><span>일</span></th>
	            		<th><span>월</span></th>
	            		<th><span>화</span></th>
	            		<th><span>수</span></th>
	            		<th><span>목</span></th>
	            		<th><span>금</span></th>
	            		<th><span>토</span></th>
	            	</tr>
	            	
	            	
	                
	            </table>
	       	</div>
            
            <div id="show-schedule" class="pop-up-bg">
	            <div class="pop-up-win">
	            	<div class="pop-up">
	            	
	            		<button id="showcloseBtn" type="button">
	            			<span>X</span>
	            		</button>
	            	
						<form action="">
							<div>
								<span class="popup-title">세부일정</span>
							</div>
							<div>
								<span>제목</span>
								<span id="show-title"></span>
							</div>
							<div>
								<span>일정 타입</span>
								<div class="show-schedule-type">
									<span></span>
								</div>
							</div>
							<div>
								<span>시작일자</span>
								<span id="show-start-date"></span>
							</div>
							<div>
								<span>종료일자</span>
								<span id="show-end-date"></span>
							</div>
							<div>
								<span>내용</span>
								<textarea rows="" cols="" id="show-desc" name="desc" readonly="readonly"></textarea>
							</div>
							
							<div class="btns">
								<button id="to-update" type="button"><span>수정</span></button>
								<button id="delete-schedule" type="button"><span>삭제</span></button>
							</div>
						</form>
						
					</div>
	            </div>
			</div>
			
			<div id="schedule-list" class="pop-up-bg">
	            <div class="pop-up-win">
	            	<div class="pop-up">
	            	
	            		<button id="listcloseBtn" type="button">
	            			<span>X</span>
	            		</button>
	            		
	            		<div>
	            		
	            		</div>
						
					</div>
	            </div>
			</div>
			
			<div id="insert-schedule" class="pop-up-bg">
	            <div class="pop-up-win">
	            	<div class="pop-up">
	            	
	            		<button id="instcloseBtn" type="button">
	            			<span>X</span>
	            		</button>
	            	
						<form action="">
							<div>
								<span class="popup-title">일정 등록</span>
							</div>
							<div>
								<span>제목</span>
								<input type="text" id="inst-title" name="inst-title" oninput="">
								<span id="inst-wrong-title"></span>
							</div>
							<div>
								<span>일정 타입</span>
								<div class="schedule-type">
									<label for="common"><input type="radio" name="scheduleType" id="common" value="0" checked> 일반 일정</label>
									<label for="tour"><input type="radio" name="scheduleType" id="tour" value="1"> 여행 일정</label>
								</div>
							</div>
							<div>
								<span>시작일자</span>
								<input type="datetime-local" id="inst-start-date" name="inst-start-date">							
							</div>
							<div>
								<span>종료일자</span>
								<input type="datetime-local" id="inst-end-date" name="inst-end-date">							
							</div>
							<div>
								<span>내용</span>
								<textarea rows="" cols="" id="inst-desc" name="desc" placeholder="적지 않아도 됩니다."></textarea>
							</div>
							
							<div class="btns">
								<button type="button" id="insert-sche-Btn"><span>저장</span></button>
								<button type="reset"><span>리셋</span></button>
							</div>
						</form>
						
					</div>
	            </div>
			</div>
			
			<div id="question-to-map" class="pop-up-bg">
	            <div class="pop-up-win">
	            	<div class="pop-up">
	            		<div class="messages">
	            			<span>여행 경로를 작성하러 가시겠어요?</span>
	            			<span>나중에 세부 일정에서도 작성할 수 있어요.</span>
	            			<div class="btns">
	            				<button type="button" id="goToMap"><span>작성하러 가기</span></button>
	            				<button type="button" id="later"><span>나중에 하기</span></button>
	            			</div>
	            		</div>
	            	</div>
	            </div>
			</div>
			
			<div id="question-to-common" class="pop-up-bg">
	            <div class="pop-up-win">
	            	<div class="pop-up">
	            		<div class="messages">
	            			<span>일반 일정으로 변경하면 기존에 작성된 여행계획이 지워집니다.</span>
	            			<span>그래도 변경하시겠어요?</span>
	            			<div class="btns">
	            				<button type="button" id="confirm">변경하기</button>
	            				<button type="button" id="not-confirm">변경하지 않기</button>
	            			</div>
	            		</div>
	            	</div>
	            </div>
			</div>
			
			<div id="update-schedule" class="pop-up-bg">
	            <div class="pop-up-win">
	            	<div class="pop-up">
	            	
	            		<button id="updatecloseBtn" type="button">
	            			<span>X</span>
	            		</button>
	            	
						<form action="">
							<div>
								<span class="popup-title">일정 수정</span>
							</div>
							<div>
								<span>제목</span>
								<input type="text" id="upd-title" name="updTitle">							
							</div>
							<div>
								<span>일정 타입</span>
								<div class="schedule-type">
									<label for="common"><input type="radio" name="scheduleType" id="common" value="0"> 일반 일정</label>
									<label for="tour"><input type="radio" name="scheduleType" id="tour" value="1"> 여행 일정</label>
								</div>
							</div>
							<div>
								<span>시작일자</span>
								<input type="datetime-local" id="upd-start-date" name="updStartDate">							
							</div>
							<div>
								<span>종료일자</span>
								<input type="datetime-local" id="upd-end-date" name="updEndDate">							
							</div>
							<div>
								<span>제목</span>
								<textarea rows="" cols="" id="upd-desc" name="desc" placeholder="적지 않아도 됩니다."></textarea>
							</div>
							
							<div class="btns">
								<button id="upd-Btn" type="button"><span>저장</span></button>
								<button id="upd-reset" type="button"><span>리셋</span></button>
							</div>
						</form>
						
					</div>
	            </div>
			</div>
			
        </main>

    </div>
    <script src="/js/jquery-3.6.0.min.js"></script>
    <script src="/js/main/background_control.js"></script>
    <script src="/js/main/monthSelector.js"></script>
    <script src="/js/main/calendarControl.js"></script>
    <script src="/js/widgetControl.js"></script>
    <script src="/js/main/popup_control.js"></script>
    <script src="/js/menu_control.js"></script>
</body>

</html>