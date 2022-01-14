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
    btns.classList.add("to-hidden");
    setTimeout(() => {
        loginForm.classList.add("to-show");
    }, 700);
    setTimeout(() => {
        btns.classList.add("hidden");
    }, 1500);
    setTimeout(() => {
        loginForm.classList.remove("hidden");
    }, 1500);
}