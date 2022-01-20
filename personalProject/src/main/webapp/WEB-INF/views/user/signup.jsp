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
    <link href="/css/user/signup/signup.css" rel="stylesheet" type="text/css">
</head>

<body>
    <div id="container">
        <main class="hidden">
            <h1 id="signup-title">회원가입</h1>
            <div>
                <form action="signup" method="post" class="signup-form">
                    <div>
                        <label>
                            <span>아이디</span>
                            <input type="text" name="username" oninput="checkUsername()" required autocomplete="off" >
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
                            <select name="question" required>
                                <option value="1" selected>ㅁㄴㅇㄹ</option>
                                <option value="2">ㅁㄴㄹㅇ</option>
                                <option value="3">ㅁㄴㄹㅇ</option>
                                <option value="4">ㅁㄴㅇㄹ</option>
                            </select>
                        </label>
                        <label>
                            <span>답변</span>
                            <input type="text" name="answer" required autocomplete="off">
                        </label>
                    </div>
                    <div id=btns>
                        <label id="submitBtn">
                            <button type="submit" disabled>가입하기</button>
                        </label>
                        <label id="backtoBtn">
                            <button type="button" onclick="showToHide()">뒤로가기</button>
                        </label>
                    </div>
                </form>
            </div>
        </main>
    </div>
    <script src="/js/jquery-3.6.0.min.js"></script>
    <script src="/js/background_control.js"></script>
    <script src="/js/user/signup/signup.js"></script>
</body>

</html>