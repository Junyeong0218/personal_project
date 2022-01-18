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

function setNextMonth() {
	const date = new Date(monthSelector.value);
	
	let month = date.getMonth() + 2;
	let year = date.getFullYear();
	
	if(month > 12) {
		month -= 12;
		year++;
	}
	
	month = String(month).padStart(2, "0");
	
	monthSelector.value = `${String(year)}-${month}`;
}

function setPrevMonth() {
	const date = new Date(monthSelector.value);
	
	let month = date.getMonth();
	let year = date.getFullYear();
	
	if(month == 0) {
		month = 12;
		year--;
	}
	
	month = String(month).padStart(2, "0");
	
	monthSelector.value = `${String(year)}-${month}`;
}