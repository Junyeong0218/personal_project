const body = document.querySelector("body");

window.onload = function() {
	controlView();
	activeSubmit();
}
window.onresize = controlView;

function controlView() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    body.style.width = width + 'px';
    body.style.height = height + 'px';
}