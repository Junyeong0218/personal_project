const timePicker = document.querySelector("#time-picker");
const hourControl = document.querySelector("#hour-control");
const minuteControl = document.querySelector("#minute-control");
const hourUp = hourControl.querySelector(".time-up");
const hourDown = hourControl.querySelector(".time-down");
const minuteUp = minuteControl.querySelector(".time-up");
const minuteDown = minuteControl.querySelector(".time-down");
const acceptBtn = timePicker.querySelector(".time-picker-btns").children[0];
const cancelBtn = timePicker.querySelector(".time-picker-btns").children[1];
const picker_hour = timePicker.querySelector(".hour");
const picker_minute = timePicker.querySelector(".minute");
let currentTag;

function showTimePicker(stayTimeTag) {
	currentTag = stayTimeTag;
	let origin_time;
	let origin_hour;
	let origin_minute;
	if(String(stayTimeTag.value).indexOf(":") > -1) {
		origin_time = String(stayTimeTag.value).split(":");
		origin_hour = origin_time[0] * 1;
		origin_minute = origin_time[1] * 1;
	} else {
		origin_time = String(stayTimeTag.value);
		if(origin_time.charAt(origin_time.length - 1) == "분") {
			origin_time = origin_time.replace("분", "");
		}
		index = origin_time.indexOf("시간");
		if(index == -1) {
			origin_hour = 0;
		} else {
			origin_hour = origin_time.substring(0, index) * 1;
		}
		origin_minute = origin_time.substring(index + 2, origin_time.length) == "" ?
					0 : origin_time.substring(index + 2, origin_time.length) * 1;
	}
	
	picker_hour.innerText = origin_hour;
	picker_minute.innerText = origin_minute;

	const x = stayTimeTag.offsetLeft;
	const y = stayTimeTag.offsetTop + stayTimeTag.offsetHeight + 5;
	timePicker.style.top = y + 'px';
	timePicker.style.left = x + 'px';
	
	timePicker.className = "pop-up";
}	

acceptBtn.addEventListener("click", function() {
	const hour = picker_hour.innerText * 1;
	const minute = picker_minute.innerText * 1;
	
	if(hour == "00" || hour == "0") {
		if(minute == "00" || minute == "0") {
			currentTag.value = `0시간 0분`;
		} else {
			currentTag.value = `${minute}분`;
		}
	} else {
		if(minute == "00" || minute == "0") {
			currentTag.value = `${hour}시간`;
		} else {
			currentTag.value = `${hour}시간 ${minute}분`;
		}
	}
	
	timePicker.className = "pop-up hidden";
	const scheduler = getCurrentScheduler();
	loadNavi(scheduler);
});

cancelBtn.addEventListener("click", function() {
	picker_hour.innerText = 0;
	picker_minute.innerText = 0;
	timePicker.className = "pop-up hidden";
});


hourUp.addEventListener("click", function() {
	const hour = picker_hour.innerText * 1 + 1;
	if(hour < 25) {
		picker_hour.innerText = hour;
	}
});

hourDown.addEventListener("click", function() {
	const hour = picker_hour.innerText * 1 - 1;
	if(hour > -1) {
		picker_hour.innerText = hour;
	}
});

minuteUp.addEventListener("click", function() {
	const minute = picker_minute.innerText * 1 + 1;
	if(minute < 61) {
		picker_minute.innerText = minute;
	}
});

minuteDown.addEventListener("click", function() {
	const minute = picker_minute.innerText * 1 - 1;
	if(minute > -1) {
		picker_minute.innerText = minute;
	}
});

