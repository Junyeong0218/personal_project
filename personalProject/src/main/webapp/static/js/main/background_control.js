const body = document.querySelector("body");

window.onresize = controllView;

function controllView() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    body.style.width = width + 'px';
    body.style.height = height + 'px';
}