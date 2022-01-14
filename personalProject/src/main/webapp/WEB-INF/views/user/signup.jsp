<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>캘린더 관리</title>
    <link href="/css/layout2.css" rel="stylesheet" type="text/css">
    <link href="/css/signup.css" rel="stylesheet" type="text/css">
</head>

<body>
    <div id="container">
        <main>
            <h1>회원가입</h1>
            <div>
                <form action="" method="post" class="signup-form">
                    <div>
                        <label>
                            <span>아이디</span>
                            <input type="text" name="username">
                        </label>
                        <label>
                            <span>비밀번호</span>
                            <input type="password" name="password">
                        </label>
                        <label>
                            <span>비밀번호 확인</span>
                            <input type="password" name="pwConfirm">
                        </label>
                        <label id="wrongpw" class="hidden"></label>
                        <label>
                            <span>이름</span>
                            <input type="text" name="name">
                        </label>
                        <label class="question">
                            <span>비밀번호 찾기 질문</span>
                            <select name="question">
                                <option value="1">ㅁㄴㅇㄹ</option>
                                <option value="2">ㅁㄴㄹㅇ</option>
                                <option value="3">ㅁㄴㄹㅇ</option>
                                <option value="4">ㅁㄴㅇㄹ</option>
                            </select>
                        </label>
                        <label>
                            <span>답변</span>
                            <input type="text" name="answer">
                        </label>
                    </div>
                    <div id=btns>
                        <label id="submitBtn">
                            <button type="submit">가입하기</button>
                        </label>
                        <label id="backtoBtn">
                            <button type="button">뒤로가기</button>
                        </label>
                    </div>
                </form>
            </div>
        </main>
    </div>
    <script src="/js/background_control.js"></script>
</body>

</html>