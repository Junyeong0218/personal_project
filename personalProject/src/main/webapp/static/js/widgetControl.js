const widget = document.querySelector("#user-widget");

function toggleWidget() {
	if(widget.classList.contains("hide")) {
		widget.classList.add("show");
		widget.classList.remove("hide");
	} else {
		widget.classList.add("hide");
		widget.classList.remove("show");
	}
}

function logout() {
	location.href="/logout";
}