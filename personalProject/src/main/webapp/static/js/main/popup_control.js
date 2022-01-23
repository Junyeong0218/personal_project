const showSchedule = document.querySelector("#show-schedule");
const instSchedule = document.querySelector("#insert-schedule");
const modiSchedule = document.querySelector("#modify-schedule");

const showclsBtn = document.querySelector("#showcloseBtn");
const instclsBtn = document.querySelector("#instcloseBtn");
const modiclsBtn = document.querySelector("#modicloseBtn");

function showPopUp(event) {
	
	if(event.target.className == 'dateBtn') {
		instSchedule.className = "pop-up-bg show-pop";
		instclsBtn.addEventListener("click", function() {
			instSchedule.className = "pop-up-bg hide-pop";
		});
	} else if(event.target.className == 'scheBtn') {
		showSchedule.className = "pop-up-bg show-pop";
		showclsBtn.addEventListener("click", function() {
			showSchedule.className = "pop-up-bg hide-pop";
		});
	}
}