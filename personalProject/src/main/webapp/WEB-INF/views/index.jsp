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
    <link href="/css/layout2.css" rel="stylesheet" type="text/css">
</head>

<body>
    <div id="container">

        <main class="hidden">
            <h1 id="welcome" class="first_position">환영합니다.</h1>
            <div id="btns">
                <div class="btn">
                    <button onclick="toSignin()">
                        로그인
                    </button>
                </div>
                <div class="btn">
                    <button onclick="toSignup()">회원가입</button>
                </div>
            </div>

            <div id="login-form" class="hidden">
                <form action="" method="post">
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
                            <button type="submit">로그인</button>
                        </label>
                        <label id="backtoBtn">
                            <button type="button" onclick="goToSelect()">뒤로가기</button>
                        </label>
                    </div>
                </form>
            </div>

        </main>

        <footer>


        </footer>
    </div>
    <script src="/js/index.js"></script>
    <script src="/js/background_control.js"></script>
</body>

</html>