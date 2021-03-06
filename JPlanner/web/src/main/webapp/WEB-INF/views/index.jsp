<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>캘린더 관리</title>
    <link href="/css/index.css" rel="stylesheet" type="text/css">
    <link href="/css/layout.css" rel="stylesheet" type="text/css">
</head>

<body>
    <div id="container">

        <main>
            <h1 id="welcome" class="first-position">환영합니다</h1>
            <div id="btns" class="btns">
                <div class="btn">
                    <button onclick="toSignin()">
                        <span>로그인</span>
                    </button>
                </div>
                <div class="btn">
                    <button onclick="toSignup()"><span>회원가입</span></button>
                </div>
            </div>

            <div id="login-form" class="login-form">
                <form action="/signin" method="post">
                    <div>
                        <label>
                            <span>아이디</span>
                            <input type="text" name="username" id="username">
                        </label>
                        <label>
                            <span>비밀번호</span>
                            <input type="password" name="password" id="password">
                        </label>
                        <label id="loginBtn">
                            <button type="submit"><span>로그인</span></button>
                        </label>
                        <label id="backtoBtn">
                            <button type="button" onclick="goToSelect()"><span>뒤로가기</span></button>
                        </label>
                    </div>
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
    <script src="/js/index.js"></script>
    <script src="/js/signin-popup.js"></script>
    <script src="/js/background_control.js"></script>
</body>

</html>