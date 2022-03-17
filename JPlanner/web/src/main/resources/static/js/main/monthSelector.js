const monthSelector = document.querySelector("#monthSelector");
const calendar = document.querySelector("#calendar");

window.onload = function () {
    controllView();
    setDefaultMonth();
}

function changeMonth(event) {
	const date = event.target.value.replace("-", "");
	
	location.href = `/main?ym=${date}`;
}

function setDefaultMonth() {
    const date = new Date();
    
    const url = String(location.href).replace("http://localhost:8080/main", "");
    
    let year;
    let month;
    
    if(url == null || url == "") {
		year = String(date.getFullYear());
	    month = String(date.getMonth() + 1).padStart(2, "0");
	    
	    monthSelector.value = `${year}-${month}`;
	} else {
		let ym = url.replace("?ym=", "");
		year = ym.substring(0, 4);
		month = ym.substring(4, 6);
		
		monthSelector.value = `${year}-${month}`;
	}
	
	printCalendar(`${year}${month}`);
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