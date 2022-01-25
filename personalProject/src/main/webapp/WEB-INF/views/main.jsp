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
            <!--캘린더 -->
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
		                        <div class="date">
		                            <button id="${intDates[dateIndex]}" class="dateBtn" type="button" onclick="showPopUp(event)">${fn:substring(strDates[dateIndex], 6, 8)}</button>
		                            
		                            <c:forEach var="schedule" items="${schedules[intDates[dateIndex]]}">
		                            
		                            	<c:if test="${schedule.oneday == true}">
				                            <div id="${schedule.id}" class="schedule oneday">
				                                <button class="scheBtn" type="button" onclick="showPopUp(event)">${schedule.title}</button>
				                            </div>
			                            </c:if>
			                            <c:if test="${schedule.firstday == true}">
			                            	<c:if test="${strDates[dateIndex] == schedule.startDate}">
					                            <div id="${schedule.id}" class="schedule firstday">
					                                <button class="scheBtn" type="button" onclick="showPopUp(event)">${k}</button>
					                            </div>
				                            </c:if>
				                            <c:if test="${schedule.lastday == true}">
					                            <div id="${schedule.id}" class="schedule lastday">
					                                <button class="scheBtn" type="button" onclick="showPopUp(event)">${k}</button>
					                            </div>
				                            </c:if>
				                            <c:if test="${schedule.middleday == true}">
					                            <div id="${schedule.id}" class="schedule middleday">
					                                <button class="scheBtn" type="button" onclick="showPopUp(event)">${k}</button>
					                            </div>
				                            </c:if>
			                            </c:if>
		                            
		                            </c:forEach>
		                            <c:set var="dateIndex" value="${dateIndex + 1}"/>
									
		                        </div>
		                    
		                    </td>
	                    
	                    </c:forEach>
	                
	                </tr>
                
                </c:forEach>
                
            </table>
            
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
								<button type="button"><span>수정</span></button>
							</div>
						</form>
						
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
								<input type="text" id="inst-title" name="inst-title">							
							</div>
							<div>
								<span>시작일자</span>
								<input type="datetime-local" id="inst-start-data" name="inst-start-date">							
							</div>
							<div>
								<span>종료일자</span>
								<input type="datetime-local" id="inst-end-data" name="inst-end-date">							
							</div>
							<div>
								<span>내용</span>
								<textarea rows="" cols="" id="inst-desc" name="desc" placeholder="적지 않아도 됩니다."></textarea>
							</div>
							
							<div class="btns">
								<button type="button"><span>저장</span></button>
								<button type="reset"><span>리셋</span></button>
							</div>
						</form>
						
					</div>
	            </div>
			</div>
			
			<div id="modify-schedule" class="pop-up-bg">
	            <div class="pop-up-win">
	            	<div class="pop-up">
	            	
	            		<button id="modicloseBtn" type="button">
	            			<span>X</span>
	            		</button>
	            	
						<form action="">
							<div>
								<span>일정등록</span>
							</div>
							<div>
								<span>제목</span>
								<input type="text" id="inst-title" name="inst-title">							
							</div>
							<div>
								<span>시작일자</span>
								<input type="datetime-local" id="inst-start-data" name="inst-start-date">							
							</div>
							<div>
								<span>종료일자</span>
								<input type="datetime-local" id="inst-end-data" name="inst-end-date">							
							</div>
							<div>
								<span>제목</span>
								<textarea rows="" cols="" id="inst-desc" name="desc" placeholder="적지 않아도 됩니다."></textarea>
							</div>
							
							<div class="btns">
								<button type="button"><span>저장</span></button>
								<button type="reset"><span>리셋</span></button>
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