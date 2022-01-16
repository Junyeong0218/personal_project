const body = document.querySelector("body");
const main = document.querySelector("main");

if (window.location.href == "http://localhost:8080/index" || window.location.href == "http://localhost:8080/" ||
	window.location.href == "http://localhost:8080") {
    window.onload = function () {
        controllView();
        mainToShow();
    }
} else {
    window.onload = function () {
        controllView();
        hideToShow();
    }
}


window.onresize = controllView;

function controllView() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    body.style.width = width + 'px';
    body.style.height = height + 'px';
}