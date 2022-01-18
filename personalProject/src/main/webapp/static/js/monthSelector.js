const monthSelector = document.querySelector("#monthSelector");

window.onload = function () {
    controllView();
    setDefaultMonth();
}

function setDefaultMonth() {
    const date = new Date();

    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, "0");
    monthSelector.value = `${year}-${month}`;
}