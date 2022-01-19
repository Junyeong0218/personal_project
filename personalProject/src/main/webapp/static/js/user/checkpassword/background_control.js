const body = document.querySelector("body");

window.onload = controlView;
window.onresize = controlView;

function controlView() {
    const width = window.innerWidth;
    const height = window.innerHeight;
	const main = document.querySelector("main");

    body.style.width = width + 'px';
    body.style.height = height + 'px';
    main.style.height = height - 77 + 'px';
}