const popUpBg = document.querySelector(".pop-up-bg");
const message = document.querySelector("#message");
const closeBtn = document.querySelector("#closeBtn");

function showPopUp() {
	popUpBg.className = "pop-up-bg show-pop";
}

function closePopUp() {
	popUpBg.className = "pop-up-bg hide-pop";
}