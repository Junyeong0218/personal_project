const showSchedule = document.querySelector("#show-schedule");
const instSchedule = document.querySelector("#insert-schedule");
const updateSchedule = document.querySelector("#update-schedule");
const ScheduleList = document.querySelector("#schedule-list");
const questionToMap = document.querySelector("#question-to-map");

const showclsBtn = document.querySelector("#showcloseBtn");
const instclsBtn = document.querySelector("#instcloseBtn");
const updclsBtn = document.querySelector("#updatecloseBtn");
const listclsBtn = document.querySelector("#listcloseBtn");
let scheduleType = document.querySelector(".schedule-type input[checked]").id;

const commonType = document.querySelector(".schedule-type input[id='common']");
const tourType = document.querySelector(".schedule-type input[id='tour']");

commonType.addEventListener("click", function() {
	scheduleType = commonType.id;
});

tourType.addEventListener("click", function() {
	scheduleType = tourType.id;
});

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
				
				listDiv.innerHTML += `<div>
										  <button type='button' id='${item.id}' onclick='listToEach(event)'>
											  <span>${item.title}</span>
											  <span>${startDate} ~ ${endDate}</span> 
										  </button>
									  </div>`;
			});
			
			if(data.length > 6) {
				listclsBtn.style.right = '0px';
			}
			
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
	scheduleType = commonType.id;
	commonType.checked = true;
	
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
	});
	
	instSchedule.querySelector("#insert-sche-Btn").addEventListener("click", function() {
		const title = document.querySelector("#inst-title").value;
		const startDate = document.querySelector("#inst-start-date").value;
		const endDate = document.querySelector("#inst-end-date").value;
		const desc = document.querySelector("#inst-desc").value;
		const type = scheduleType == "common" ? 0 : 1;
		
		if(type == 0) {
			$.ajax({
		        type: "post",
		        url: "/user/insertCommonSchedule",
		        data: { "title": title,
		        		"startDate": startDate,
		        		"endDate": endDate,
		        		"description": desc,
		        		"type" : type },
		        dataType: "json",
		        success: function (data) {
					if(data == 1) {
						const monthSelector = document.querySelector("#monthSelector").value;
						const year = String(monthSelector).substring(0, 4);
						const month = String(monthSelector).substring(5, 7);
						location.href = `/main?ym=${year}${month}`;
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
		} else {
			$.ajax({
		        type: "post",
		        url: "/user/insertTourSchedule",
		        data: { "title": title,
		        		"startDate": startDate,
		        		"endDate": endDate,
		        		"description": desc,
		        		"type" : type },
		        dataType: "json",
		        success: function (data) {
					if(data == null) {
						alert("insert 실패");
					} else {
						console.log(data);
						instSchedule.className = "pop-up-bg hide-pop";
						questionToMap.style = "z-index: 2;";
						questionToMap.className = "pop-up-bg show-pop";
						
						questionToMap.querySelector("#goToMap").addEventListener("click", function() {
							const startDay = new Date(startDate).getDate();
							const endDay = new Date(endDate).getDate();
							const days = endDay - startDay + 1;
							const link = `/maps?days=${days}&id=${data.id}`;
							
							window.open(link, "_blank");
							
							const monthSelector = document.querySelector("#monthSelector").value;
							const year = String(monthSelector).substring(0, 4);
							const month = String(monthSelector).substring(5, 7);
							location.href = `/main?ym=${year}${month}`;
						});
						
						questionToMap.querySelector("#later").addEventListener("click", function() {
							const monthSelector = document.querySelector("#monthSelector").value;
							const year = String(monthSelector).substring(0, 4);
							const month = String(monthSelector).substring(5, 7);
							location.href = `/main?ym=${year}${month}`;
						});
					}
				},
				error: function (xhr, status, error) {
					console.log(xhr);
					console.log(status);
					console.log(error);
				}
			});
		}
	});
}

function showSchedulePopup(event) {
	let scheduleId;
	if(typeof event == 'string'){
		scheduleId = event;
	} else {
		scheduleId = event.target.parentElement.id;
	}
	console.log(scheduleId);
	
	let title;
	let desc;
	let startDate;
	let endDate;
	let type;
		
	$.ajax({
        type: "post",
        url: "/user/getSchedule",
        data: { "scheduleId": scheduleId },
        dataType: "text",
        success: function (data) {
			data = JSON.parse(data);
			title = data.title;
			desc = data.description;
			type = data.type == 0 ? "일반 일정" : "여행 일정";
			showSchedule.querySelector("#show-title").innerText = title;
			showSchedule.querySelector("#show-desc").innerText = desc;
			showSchedule.querySelector(".show-schedule-type span").innerText = type;
			
			const tempStartDate = new Date(data.startDate);
			const tempEndDate = new Date(data.endDate);
			
			let year = tempStartDate.getFullYear();
			let month = String(tempStartDate.getMonth() + 1).padStart(2, "0");
			let day = String(tempStartDate.getDate()).padStart(2, "0");
			let hour = String(tempStartDate.getHours()).padStart(2, "0");
			let minute = String(tempStartDate.getMinutes()).padStart(2, "0");
			startDate = `${year}-${month}-${day} ${hour}:${minute}`
			
			showSchedule.querySelector("#show-start-date").innerText = startDate;
			
			startDate = `${year}-${month}-${day}T${hour}:${minute}`
			
			year = tempEndDate.getFullYear();
			month = String(tempEndDate.getMonth() + 1).padStart(2, "0");
			day = String(tempEndDate.getDate()).padStart(2, "0");
			hour = String(tempEndDate.getHours()).padStart(2, "0");
			minute = String(tempEndDate.getMinutes()).padStart(2, "0");
			endDate = `${year}-${month}-${day} ${hour}:${minute}`;
			
			showSchedule.querySelector("#show-end-date").innerText = endDate;
			
			endDate = `${year}-${month}-${day}T${hour}:${minute}`;
			
			if(data.type == 1) {
				const goToMapButton = document.createElement("button");
				goToMapButton.id = "goToMap";
				goToMapButton.className = "goToMapButton";
				goToMapButton.type = "button";
				goToMapButton.innerHTML = `<span>여행 경로 작성하러 가기</span>`;
				showSchedule.querySelector(".show-schedule-type").appendChild(goToMapButton);
				
				const startDay = new Date(startDate).getDate();
				const endDay = new Date(endDate).getDate();
				const days = endDay - startDay + 1;
				
				goToMapButton.addEventListener("click", function() {
					const link = `/maps?days=${days}&id=${data.id}`;
					
					window.open(link, "_blank");
				});
			}
			
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
		const goToMap = showSchedule.querySelector("#goToMap");
		if(goToMap != null) { 
			goToMap.remove();
		}
	});
	
	showSchedule.querySelector("#delete-schedule").addEventListener("click", function() {
		$.ajax({
        type: "post",
        url: "/user/deleteSchedule",
        data: { "scheduleId": scheduleId },
        dataType: "json",
        success: function (data) {
			if(data == 1){
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
		const upType = updateSchedule.querySelector(".schedule-type");
		
		updTitle.value = title;
		updStartDate.value = startDate;
		updEndDate.value = endDate;
		updDesc.value = desc;
		if(type == "일반 일정") {
			upType.querySelector("input[id='common']").checked = true;
		} else {
			upType.querySelector("input[id='tour']").checked = true;
		}
		
		updateSchedule.className = "pop-up-bg show-pop";
		updclsBtn.addEventListener("click", function() {
			updateSchedule.className = "pop-up-bg hide-pop";
		});
		
		const questionToCommon = document.querySelector("#question-to-common");
		upType.querySelector("input[id='common']").addEventListener("click", function() {
			if(type == "일반 일정") {
				return;
			} else {
				questionToCommon.style = "z-index: 2;";
				questionToCommon.className = "pop-up-bg show-pop";
			}
		});
		
		questionToCommon.querySelector("#confirm").addEventListener("click", function() {
			upType.querySelector("input[id='common']").checked = true;
			questionToCommon.className = "pop-up-bg hide-pop";
			questionToCommon.style = "";
		});
		
		questionToCommon.querySelector("#not-confirm").addEventListener("click", function() {
			questionToCommon.className = "pop-up-bg hide-pop";
			upType.querySelector("input[id='tour']").checked = true;
			questionToCommon.style = "";
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
			let upTypeValue;
			
			if(upType.querySelector("input[id='common']").checked == true) {
				upTypeValue = 0;
			} else {
				upTypeValue = 1;
			}
			console.log(scheduleId);
			console.log(upTypeValue);
			
			if(upTypeValue == 0) {
				$.ajax({
			        type: "post",
			        url: "/user/updateCommonSchedule",
			        data: { "id": scheduleId,
			        		"type": upTypeValue,
							"title": updTitleValue,
			        		"startDate": updStartDateValue,
			        		"endDate": updEndDateValue,
			        		"description": updDescValue },
			        dataType: "json",
			        success: function (data) {
						if(data == 1) {
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
			} else {
				$.ajax({
			        type: "post",
			        url: "/user/updateTourSchedule",
			        data: { "id": scheduleId,
			        		"type": upTypeValue,
							"title": updTitleValue,
			        		"startDate": updStartDateValue,
			        		"endDate": updEndDateValue,
			        		"description": updDescValue },
			        dataType: "json",
			        success: function (data) {
						if(data == null) {
							alert("update 실패");
							return;
						} else {
							updateSchedule.className = "pop-up-bg hide-pop";
							questionToMap.style = "z-index: 2;";
							questionToMap.className = "pop-up-bg show-pop";
							
							questionToMap.querySelector("#goToMap").addEventListener("click", function() {
								const startDay = new Date(startDate).getDate();
								const endDay = new Date(endDate).getDate();
								const days = endDay - startDay + 1;
								const link = `/maps?days=${days}&id=${data.id}`;
								
								window.open(link, "_blank");
								
								const monthSelector = document.querySelector("#monthSelector").value;
								const year = String(monthSelector).substring(0, 4);
								const month = String(monthSelector).substring(5, 7);
								location.href = `/main?ym=${year}${month}`;
							});
							
							questionToMap.querySelector("#later").addEventListener("click", function() {
								const monthSelector = document.querySelector("#monthSelector").value;
								const year = String(monthSelector).substring(0, 4);
								const month = String(monthSelector).substring(5, 7);
								location.href = `/main?ym=${year}${month}`;
							});
						}
				  	},
				  	error: function (xhr, status, error) {
						console.log(xhr);
						console.log(status);
						console.log(error);
					}
				});
			}
			
		});
		
	});
}