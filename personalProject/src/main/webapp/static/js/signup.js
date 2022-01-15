function hideToShow() {
    main.classList.add("to-show");
    setTimeout(() => {
        main.classList.remove("hidden");
    }, 1500);
}

function showToHide() {
    main.classList.remove("to-show");
    main.classList.add("to-hidden");
    setTimeout(() => {
        main.classList.add("hidden");
        location.href = "http://127.0.0.1:5500/WEB-INF/views/index.html";
    }, 1500);
}