<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>캘린더 관리</title>
    <link href="/css/layout.css" rel="stylesheet" type="text/css">
    <link href="/css/index.css" rel="stylesheet" type="text/css">
    <link href="/css/signup.css" rel="stylesheet" type="text/css">
</head>

<body>
    <div id="container">
        <main class="hidden">
            <h1 id="signup-title">회원가입</h1>
            <div>
                <form action="" method="post" class="signup-form">
                    <div>
                        <label>
                            <span>아이디</span>
                            <input type="text" id="username" name="username" oninput="checkUsername()" required autocomplete="off" >
                        </label>
                        <span id="wrongid" class="hidden"></span>
                        <label>
                            <span>비밀번호</span>
                            <input type="password" name="password" oninput="checkPassword()" required pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$">
                        </label>
                        <label>
                            <span>비밀번호 확인</span>
                            <input type="password" name="pwConfirm" oninput="checkPassword()" required pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$">
                        </label>
                        <span id="wrongpw" class="hidden"></span>
                        <label>
                            <span>이름</span>
                            <input type="text" name="name" required autocomplete="off">
                        </label>
                        <label class="question">
                            <span>비밀번호 찾기 질문</span>
                            <select name="pw_question" required>
                                <option value="1" selected>ㅁㄴㅇㄹ</option>
                                <option value="2">ㅁㄴㄹㅇ</option>
                                <option value="3">ㅁㄴㄹㅇ</option>
                                <option value="4">ㅁㄴㅇㄹ</option>
                            </select>
                        </label>
                        <label>
                            <span>답변</span>
                            <input type="text" name="pw_answer" required autocomplete="off">
                        </label>
                    </div>
                    <div id=btns>
                        <label id="submitBtn">
                            <button type="button" disabled><span>가입하기</span></button>
                        </label>
                        <label id="backtoBtn">
                            <button type="button" onclick="showToHide()"><span>뒤로가기</span></button>
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
    <script src="/js/signup/signup.js"></script>
    <script src="/js/signin-popup.js"></script>
    <script src="/js/background_control.js"></script>
</body>

</html>