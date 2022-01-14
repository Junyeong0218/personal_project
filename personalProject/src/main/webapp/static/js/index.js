const body = document.querySelector("body");
const welcomeMessage = document.querySelector("#welcome");
const btns = document.querySelector("#btns");
const loginBtn = document.querySelector("#btns").children[0];
const loginForm = document.querySelector("#login-form");

window.onload = controllView;
window.onresize = controllView;

function controllView() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    body.style.width = width + 'px';
    body.style.height = height + 'px';
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