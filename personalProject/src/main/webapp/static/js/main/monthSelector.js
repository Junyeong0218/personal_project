const monthSelector = document.querySelector("#monthSelector");
const calendar = document.querySelector("#calendar");

window.onload = function () {
    controllView();
    setDefaultMonth();
}

calendar.addEventListener("wheel", function(event){
	// wheel up = deltaY -100 // wheel down = deltaY 100
	event.preventDefault();
	
	if(event.deltaY < 0) {
		setNextMonth();
	} else {
		setPrevMonth();
	}
});

function setDefaultMonth() {
    const date = new Date();
    
    const url = String(location.href).replace("http://localhost:8080/main", "");
    
    if(url == null || url == "") {
		const year = String(date.getFullYear());
	    const month = String(date.getMonth() + 1).padStart(2, "0");
	    
	    monthSelector.value = `${year}-${month}`;
	} else {
		let ym = url.replace("?ym=", "");
		const year = ym.substring(0, 4);
		const month = ym.substring(4, 6);
		
		monthSelector.value = `${year}-${month}`;
	}

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
	
	location.href = `/main?ym=${year}${month}`;
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
	
	location.href = `/main?ym=${year}${month}`;
}