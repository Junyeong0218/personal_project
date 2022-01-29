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
                        <button type="button" onclick="toggleWidget()">
                        	<c:if test="${sessionScope.user.imgType == null}">
                        		<img src="/images/userinfo/profile_image.png">
                        	</c:if>
                        	<c:if test="${sessionScope.user.imgType != null}">
                        		<img src="/images/userinfo/${sessionScope.user.username}/profile_image.${sessionScope.user.imgType}">
                        	</c:if>
                        </button>
                        
                    </div>
                    
                </nav>
            </div>

        </header>
        
        <div id="user-widget" class="user-widget hidden">
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
		
		<aside>
			
		
		</aside>

        <main>
            <!--캘린더 -->
            
            <div id="calendar">
            
	            <div id="month">
	            	<button type="button" onclick="setPrevMonth()">◀</button>
	            	<input type="month" id="monthSelector">
	            	<button type="button" onclick="setNextMonth()">▶</button>
	            </div>
	            
	            <table>
	            
	            	<c:set var="dateIndex" value="0"/>
	            	<c:forEach var="i" begin="0" end="5">
	                
		                <tr>
		                
		                	<c:forEach var="j" begin="0" end="6">
		                	
			                    <td>
			                    	
			                    	<c:set var="isPreMonth" value="" />
	                            	<c:if test="${fn:substring(strDates[dateIndex], 0, 6) != selectedMonth}">
	                            		<c:set var="isPreMonth" value="notPreMonth" />
	                            	</c:if>
			                    
			                        <div class="date ${isPreMonth}">
			                            <button id="${intDates[dateIndex]}" class="dateBtn" type="button" onclick="showPopUp(event)">${fn:substring(strDates[dateIndex], 6, 8)}</button>
			                            
			                            <c:if test="${fn:length(schedules[intDates[dateIndex]]) > 5}">
			                            	<button id="${intDates[dateIndex]}-list" class="schedule-list-Btn" type="button" onclick="showPopUp(event)">
			                            		<span>+${fn:length(schedules[intDates[dateIndex]]) - 5}</span>
			                            	</button>
			                            </c:if>
			                            
			                            <c:forEach var="schedule_index" begin="0" end="4">
			                            
			                            	<c:set var="schedule" value="${schedules[intDates[dateIndex]][schedule_index]}"/>
			                            	
			                            	<c:if test="${schedule.id == -1}">
					                            <span></span>
				                            </c:if>
			                            	<c:if test="${schedule.oneday == true}">
					                            <div id="${schedule.id}" class="schedule oneday">
					                                <button class="scheBtn" type="button" onclick="showPopUp(event)">${schedule.title}</button>
					                            </div>
				                            </c:if>
				                            <c:if test="${schedule.firstday == true}">
				                            	<div id="${schedule.id}" class="schedule firstday">
					                                <button class="scheBtn" type="button" onclick="showPopUp(event)">${schedule.title}</button>
					                            </div>
					                        </c:if>
				                            <c:if test="${schedule.lastday == true}">
					                            <div id="${schedule.id}" class="schedule lastday">
					                                <button class="scheBtn" type="button" onclick="showPopUp(event)"></button>
					                            </div>
				                            </c:if>
				                            <c:if test="${schedule.middleday == true}">
					                            <div id="${schedule.id}" class="schedule middleday">
					                                <button class="scheBtn" type="button" onclick="showPopUp(event)"></button>
					                            </div>
				                            </c:if>
			                            
			                            </c:forEach>
			                            <c:set var="dateIndex" value="${dateIndex + 1}"/>
										
			                        </div>
			                    
			                    </td>
		                    
		                    </c:forEach>
		                
		                </tr>
	                
	                </c:forEach>
	                
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
								<span>세부일정</span>
							</div>
							<div>
								<span>제목</span>
								<span id="show-title"></span>
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
								<span>일정등록</span>
							</div>
							<div>
								<span>제목</span>
								<input type="text" id="inst-title" name="inst-title" oninput="">
								<span id="inst-wrong-title"></span>
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
			
			<div id="update-schedule" class="pop-up-bg">
	            <div class="pop-up-win">
	            	<div class="pop-up">
	            	
	            		<button id="updatecloseBtn" type="button">
	            			<span>X</span>
	            		</button>
	            	
						<form action="">
							<div>
								<span>일정등록</span>
							</div>
							<div>
								<span>제목</span>
								<input type="text" id="upd-title" name="updTitle">							
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
    <script src="/js/widgetControl.js"></script>
    <script src="/js/main/popup_control.js"></script>
</body>

</html>