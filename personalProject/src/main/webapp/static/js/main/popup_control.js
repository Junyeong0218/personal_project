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
		const id = event.target.parentElement.id;
		
		$.ajax({
	        type: "post",
	        url: "/user/getSchedule",
	        data: { "id": id },
	        dataType: "text",
	        success: function (data) {
				data = JSON.parse(data);
				
				showSchedule.querySelector("#show-title").innerText = data.title;
				showSchedule.querySelector("#show-start-date").innerText = `${data.startDate.year}`;
				showSchedule.querySelector("#show-end-date").innerText = data.endDate;
				showSchedule.querySelector("#show-desc").innerText = data.description;
		  	},
		  	error: function (xhr, status, error) {
				console.log(xhr);
				console.log(status);
				console.log(error);
			}
		});
		
		showSchedule.className = "pop-up-bg show-pop";
		showclsBtn.addEventListener("click", function() {
			showSchedule.className = "pop-up-bg hide-pop";
		});
	}
}