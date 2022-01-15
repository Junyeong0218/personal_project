const body = document.querySelector("body");
const main = document.querySelector("main");

if (window.location.href == "http://127.0.0.1:5500/WEB-INF/views/index.html") {
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