const widget = document.querySelector("#user-widget");

function toggleWidget() {
	if(widget.classList.contains("hide") || widget.classList.contains("hidden")) {
		widget.className = "user-widget show";
	} else {
		widget.className = "user-widget hide";
	}
}

function logout() {
	location.href="/logout";
}

function confirmPw() {
	location.href="/user/checkPassword";
}