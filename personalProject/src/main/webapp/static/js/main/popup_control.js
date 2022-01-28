const showSchedule = document.querySelector("#show-schedule");
const instSchedule = document.querySelector("#insert-schedule");
const updateSchedule = document.querySelector("#update-schedule");
const ScheduleList = document.querySelector("#schedule-list");

const showclsBtn = document.querySelector("#showcloseBtn");
const instclsBtn = document.querySelector("#instcloseBtn");
const updclsBtn = document.querySelector("#updatecloseBtn");
const listclsBtn = document.querySelector("#listcloseBtn");

function showPopUp(event) {
	
	if(event.target.className == 'dateBtn') {
		insertSchedule(event);
		
	} else if(event.target.className == 'scheBtn') {
		showSchedulePopup(event);
		
	} else if(event.target.className == 'schedule-list-Btn') {
		showScheduleList(event);
		
	}
}

function showScheduleList(event) {
	
	const listDiv = document.querySelector("#schedule-list > div > div > div");
	const ym = event.target.parentElement.children[0].id;
	
	$.ajax({
        type: "post",
        url: "/user/getScheduleList",
        data: { "ym": ym, },
        dataType: "text",
        success: function (data) {
			data = JSON.parse(data);
			
			const title_year = String(ym).substring(0, 4);
			const title_month = String(ym).substring(4, 6);
			const title_day = String(ym).substring(6, 8);
			
			listDiv.innerHTML = `<div>
									<span>${title_year}-${title_month}-${title_day} 의 일정 목록</span>
								 </div>`;
								 
			listDiv.id = ym;
			
			data.forEach(function(item) {
				
				let year = item.startDate.year;
				let month = String(item.startDate.monthValue).padStart(2, "0");
				let day = String(item.startDate.dayOfMonth).padStart(2, "0");
				let hour = String(item.startDate.hour).padStart(2, "0");
				let minute = String(item.startDate.minute).padStart(2, "0");
				const startDate = `${year}-${month}-${day} ${hour}:${minute}`;
				
				year = item.endDate.year;
				month = String(item.endDate.monthValue).padStart(2, "0");
				day = String(item.endDate.dayOfMonth).padStart(2, "0");
				hour = String(item.endDate.hour).padStart(2, "0");
				minute = String(item.endDate.minute).padStart(2, "0");
				const endDate = `${year}-${month}-${day} ${hour}:${minute}`;
				
				listDiv.innerHTML += 
									`
									<div>
										<button type='button' id='${item.id}' onclick='listToEach(event)'>
											<span>${item.title}</span>
											<span>${startDate} ~ ${endDate}</span> 
										</button>
									</div>`;
			});
			
	  	},
	  	error: function (xhr, status, error) {
			console.log(xhr);
			console.log(status);
			console.log(error);
		}
	});
	
	ScheduleList.className = "pop-up-bg show-pop";
	listclsBtn.addEventListener("click", function() {
		ScheduleList.className = "pop-up-bg hide-pop";
		setTimeout(function() {
			listDiv.textContent = "";
		}, 550);
	});
}

function listToEach(event) {
	const listDiv = document.querySelector("#schedule-list > div > div > div");
	
	ScheduleList.className = "pop-up-bg hide-pop";
	setTimeout(function() {
		listDiv.textContent = "";
	}, 550);
	
	showSchedulePopup(event.target.id);
}

function insertSchedule(event) {
	const id = String(event.target.id);
	const id_year = id.substring(0, 4);
	const id_month = id.substring(4, 6);
	const id_day = id.substring(6, 8);
	
	let origin_date = new Date();
	let year = String(origin_date.getFullYear());
	let month = String(origin_date.getMonth() + 1).padStart(2, "0");
	let day = String(origin_date.getDate());
	let hour = String("00");
	let minute = String("00");
	
	let date;
	
	if(new Date(id_year, id_month, id_day).getTime() === new Date(year, month, day).getTime()) {
		origin_date = Date.now();
	} else {
		origin_date = new Date(`${id_year}-${id_month}-${id_day}T${hour}:${minute}`).valueOf();
	}
	
	date = new Date(origin_date + 3_600_000);
	year = String(date.getFullYear());
	month = String(date.getMonth() + 1).padStart(2, "0");
	day = String(date.getDate()).padStart(2, "0");
	hour = String(date.getHours()).padStart(2, "0");
	instSchedule.querySelector("#inst-start-date").value = `${year}-${month}-${day}T${hour}:${minute}`;
	
	date = new Date(origin_date + 7_200_000);
	year = String(date.getFullYear());
	month = String(date.getMonth() + 1).padStart(2, "0");
	day = String(date.getDate()).padStart(2, "0");
	hour = String(date.getHours()).padStart(2, "0");
	instSchedule.querySelector("#inst-end-date").value = `${year}-${month}-${day}T${hour}:${minute}`;
	
	instSchedule.className = "pop-up-bg show-pop";
	instclsBtn.addEventListener("click", function() {
		instSchedule.className = "pop-up-bg hide-pop";
	})
	
	instSchedule.querySelector("#insert-sche-Btn").addEventListener("click", function() {
		const title = document.querySelector("#inst-title").value;
		const startDate = document.querySelector("#inst-start-date").value;
		const endDate = document.querySelector("#inst-end-date").value;
		const desc = document.querySelector("#inst-desc").value;
		
		$.ajax({
	        type: "post",
	        url: "/user/instSchedule",
	        data: { "title": title,
	        		"startDate": startDate,
	        		"endDate": endDate,
	        		"description": desc },
	        dataType: "json",
	        success: function (data) {
				if(data.result == '1'){
					instSchedule.className = "pop-up-bg hide-pop";
					const monthSelector = document.querySelector("#monthSelector").value;
					const year = String(monthSelector).substring(0, 4);
					const month = String(monthSelector).substring(5, 7);
					location.href = `/main?ym=${year}${month}`;
					return;
				} else {
					return;
				}
		  	},
		  	error: function (xhr, status, error) {
				console.log(xhr);
				console.log(status);
				console.log(error);
			}
		});
		
	});
}

function showSchedulePopup(event) {
	let scheduleId;
	if(typeof event == 'string'){
		scheduleId = event;
	} else {
		scheduleId = event.target.parentElement.id;
	}
	
	let title;
	let desc;
	let startDate;
	let endDate;
		
	$.ajax({
        type: "post",
        url: "/user/getSchedule",
        data: { "scheduleId": scheduleId },
        dataType: "text",
        success: function (data) {
			data = JSON.parse(data);
			title = data.title;
			desc = data.description;
			showSchedule.querySelector("#show-title").innerText = title;
			showSchedule.querySelector("#show-desc").innerText = desc;

			let year = data.startDate.year;
			let month = String(data.startDate.monthValue).padStart(2, "0");
			let day = String(data.startDate.dayOfMonth).padStart(2, "0");
			let hour = String(data.startDate.hour).padStart(2, "0");
			let minute = String(data.startDate.minute).padStart(2, "0");
			startDate = `${year}-${month}-${day} ${hour}:${minute}`
			
			showSchedule.querySelector("#show-start-date").innerText = startDate;
			
			startDate = `${year}-${month}-${day}T${hour}:${minute}`
			
			year = data.endDate.year;
			month = String(data.endDate.monthValue).padStart(2, "0");
			day = String(data.endDate.dayOfMonth).padStart(2, "0");
			hour = String(data.endDate.hour).padStart(2, "0");
			minute = String(data.endDate.minute).padStart(2, "0");
			endDate = `${year}-${month}-${day} ${hour}:${minute}`;
			
			showSchedule.querySelector("#show-end-date").innerText = endDate;
			
			endDate = `${year}-${month}-${day}T${hour}:${minute}`;
			
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
	
	showSchedule.querySelector("#delete-schedule").addEventListener("click", function() {
		$.ajax({
        type: "post",
        url: "/user/deleteSchedule",
        data: { "scheduleId": scheduleId },
        dataType: "json",
        success: function (data) {
			if(data.result == '1'){
				showSchedule.className = "pop-up-bg hide-pop";
				const monthSelector = document.querySelector("#monthSelector").value;
				const year = String(monthSelector).substring(0, 4);
				const month = String(monthSelector).substring(5, 7);
				location.href = `/main?ym=${year}${month}`;
				return;
			} else {
				return;
			}
	  	},
	  	error: function (xhr, status, error) {
			console.log(xhr);
			console.log(status);
			console.log(error);
		}
		
		});
	});
	
	const showToUpdateBtn = showSchedule.querySelector("#to-update");
	showToUpdateBtn.addEventListener("click", function() {
		showSchedule.className = "pop-up-bg hide-pop";
		
		const updTitle = updateSchedule.querySelector("#upd-title");
		const updStartDate = updateSchedule.querySelector("#upd-start-date");
		const updEndDate = updateSchedule.querySelector("#upd-end-date");
		const updDesc = updateSchedule.querySelector("#upd-desc");
		
		updTitle.value = title;
		updStartDate.value = startDate;
		updEndDate.value = endDate;
		updDesc.value = desc;
		
		updateSchedule.className = "pop-up-bg show-pop";
		updclsBtn.addEventListener("click", function() {
			updateSchedule.className = "pop-up-bg hide-pop";
		});
		
		updateSchedule.querySelector("#upd-reset").addEventListener("click", function() {
			updTitle.value = title;
			updStartDate.value = startDate;
			updEndDate.value = endDate;
			updDesc.value = desc;
		});
		
		updateSchedule.querySelector("#upd-Btn").addEventListener("click", function() {
			const updTitleValue = updTitle.value;
			const updStartDateValue = updStartDate.value;
			const updEndDateValue = updEndDate.value;
			const updDescValue = updDesc.value;
			
			$.ajax({
		        type: "post",
		        url: "/user/updateSchedule",
		        data: { "id": scheduleId,
						"title": updTitleValue,
		        		"startDate": updStartDateValue,
		        		"endDate": updEndDateValue,
		        		"description": updDescValue },
		        dataType: "json",
		        success: function (data) {
					if(data.result == '1'){
						updateSchedule.className = "pop-up-bg hide-pop";
						const monthSelector = document.querySelector("#monthSelector").value;
						const year = String(monthSelector).substring(0, 4);
						const month = String(monthSelector).substring(5, 7);
						location.href = `/main?ym=${year}${month}`;
						return;
					} else {
						return;
					}
			  	},
			  	error: function (xhr, status, error) {
					console.log(xhr);
					console.log(status);
					console.log(error);
				}
			});
		});
		
	});
}