<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
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
                <tr>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule firstday">
                                <button type="button"><span></span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule middleday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button type="button">날짜</button>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule lastday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="date">
                            <button class="dateBtn" type="button" onclick="showPopUp(event)">날짜</button>
                            <div class="schedule oneday">
                                <button class="scheBtn" type="button" onclick="showPopUp(event)">asdf</button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                            <div class="schedule oneday">
                                <button type="button"><span>asdf</span></button>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
            
            <div id="show-schedule" class="pop-up-bg">
	            <div class="pop-up-win">
	            	<div class="pop-up">
	            	
	            		<button id="showcloseBtn" type="button">
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
    <script src="/js/main/background_control.js"></script>
    <script src="/js/main/monthSelector.js"></script>
    <script src="/js/widgetControl.js"></script>
    <script src="/js/main/popup_control.js"></script>
</body>

</html>