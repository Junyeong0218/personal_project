const welcomeMessage = document.querySelector("#welcome");
const btns = document.querySelector("#btns");
const loginBtn = document.querySelector("#btns").children[0];
const loginForm = document.querySelector("#login-form");

function mainToShow() {
    welcomeMessage.className = "to-show first-position";
    btns.className = "btns to-show";
}

function toSignin() {
	btns.className = "to-hidden";
    welcomeMessage.className = "to-show go-up";
    setTimeout(() => {
		btns.classList.add("hidden")
        loginForm.className = "to-show";
    }, 1450);
}

function goToSelect() {
	loginForm.className = "to-hidden";
    welcomeMessage.className = "to-show go-down";
    setTimeout(() => {
		loginForm.classList.add("hidden")
        btns.className = "btns to-show";
    }, 1450);
}

function toSignup() {
    main.className = "to-hidden";
    setTimeout(() => {
        location.href="http://localhost:8080/user/signup"
    }, 1450);
}