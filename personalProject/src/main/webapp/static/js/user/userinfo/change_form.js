const modifyUserInfo = document.querySelector("#modifyUserInfo");
const modifyPw = document.querySelector("#modifyPw");
const formSelector = document.querySelectorAll("#formSelector > button");
const selectorBar = document.querySelector("#selectorBar");

function selectMP() {
	selectorBar.className = "to-right";
	formSelector[0].disabled = false;
	formSelector[0].style.cursor = "pointer";
	formSelector[1].style.cursor = "default";
	formSelector[1].disabled = true;
	
	modifyUserInfo.className = "to-hidden";
	setTimeout(() => {
		modifyUserInfo.classList.add("hidden")
        modifyPw.className = "to-show";
    }, 450);
}

function selectMB() {
	selectorBar.className = "to-left";
	formSelector[0].disabled = true;
	formSelector[0].style.cursor = "default";
	formSelector[1].style.cursor = "pointer";
	formSelector[1].disabled = false;
	
	modifyPw.className = "to-hidden";
	setTimeout(() => {
		modifyPw.classList.add("hidden")
        modifyUserInfo.className = "to-show";
    }, 450);
}