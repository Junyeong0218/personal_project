const welcomeMessage = document.querySelector("#welcome");
const btns = document.querySelector("#btns");
const loginBtn = document.querySelector("#btns").children[0];
const loginForm = document.querySelector("#login-form");

function mainToShow() {
    main.classList.add("to-show");
    setTimeout(() => {
        main.classList.remove("hidden");
    }, 1500);
}

function toSignin() {
    btns.classList.remove("to-show");
    btns.classList.add("to-hidden");
    welcomeMessage.classList.remove("go-down");
    welcomeMessage.classList.add("go-up");
    setTimeout(() => {
        loginForm.classList.remove("to-hidden");
        loginForm.classList.add("to-show");
    }, 700);
    setTimeout(() => {
        btns.classList.add("hidden");
    }, 1500);
    setTimeout(() => {
        loginForm.classList.remove("hidden");
    }, 1500);
}

function goToSelect() {
    loginForm.classList.remove("to-show");
    loginForm.classList.add("to-hidden");
    welcomeMessage.classList.remove("go-up");
    welcomeMessage.classList.add("go-down");
    setTimeout(() => {
        btns.classList.remove("to-hidden");
        btns.classList.add("to-show");
    }, 700);
    setTimeout(() => {
        loginForm.classList.add("hidden");
    }, 1500);
    setTimeout(() => {
        btns.classList.remove("hidden");
    }, 1500);
}

function toSignup() {
    welcomeMessage.classList.add("to-hidden");
    btns.classList.remove("to-show");
    btns.classList.add("to-hidden");
    setTimeout(() => {
        welcomeMessage.classList.add("hidden");
        btns.classList.add("hidden");
    }, 1500);
    setTimeout(() => {
        location.href = "http://127.0.0.1:5500/WEB-INF/views/user/signup.html";
    }, 1540);
}