function printCalendar(ym) {
	$.ajax({
        type: "post",
        url: "/user/getCalendar",
        data: { "ym": ym },
        dataType: "json",
        success: function (data) {
			writeCalendarTag(data, ym);
		},
		error: function (xhr, status, error) {
				console.log(xhr);
				console.log(status);
				console.log(error);
			}
		});
}

function writeCalendarTag(data, ym) {
	let dateIndex = 0;
	let weekIndex;
	let dayIndex;
	const dates = data.dates;
	const schedules = data.schedules;
	const dateObj = new Date();
	const today = `${dateObj.getFullYear()}${String(dateObj.getMonth() + 1).padStart(2, "0")}${dateObj.getDate()}` * 1;
	const table = document.querySelector("table");
	
	for(weekIndex=0; weekIndex<6; weekIndex++) {
		const tr = document.createElement("tr");
		for(dayIndex=0; dayIndex<7; dayIndex++) {
			const td = document.createElement("td");
			td.className = String(dates[dateIndex]).substring(0, 6) == ym ? "notPreMonth" : "";
			
			const date = String(dates[dateIndex]).substring(6, 8) * 1;
			
			const div = document.createElement("div");
			div.className = "date";
			div.innerHTML = `<button id="${dates[dateIndex]}" class="dateBtn" type="button" onclick="showPopUp(event)">
								 <div id=${dates[dateIndex] == today ? "today" : ""}>
								 	 <span>${date}</span>
								 </div>
							 </button>
							 `;
			
			const scheduleList = schedules[dates[dateIndex]];
			
			if(scheduleList.length != 0) {
				if(scheduleList.length > 5) {
					div.innerHTML += `<button id="${dates[dateIndex]}-list" class="schedule-list-Btn" type="button" onclick="showPopUp(event)">
										  <span>+${scheduleList.length - 5}</span>
									  </button>
									  `;
				}
				const maxForCnt = scheduleList.length > 4 ? 5 : scheduleList.length;
				
				for(let scheduleIndex=0; scheduleIndex<maxForCnt; scheduleIndex++) {
					const schedule = scheduleList[scheduleIndex];
					if(schedule.id == -1) {
						div.innerHTML += `<span></span>`;
					} else {
						const dayType = schedule.oneday == true ? "oneday" :
										schedule.firstday == true ? "firstday" :
										schedule.lastday == true ? "lastday" :
										schedule.middleday == true ? "middleday" : "";
										
						if(dayType == "oneday" || dayType == "firstday") {
							div.innerHTML += `<div id="${schedule.id}" class="schedule ${dayType}">
												  <button class="scheBtn" type="button" onclick="showPopUp(event)">
												  	  <span>${schedule.title}</span>
												  </button>
											  </div>`;
						} else {
							div.innerHTML += `<div id="${schedule.id}" class="schedule ${dayType}">
												  <button class="scheBtn" type="button" onclick="showPopUp(event)">
												  </button>
											  </div>`;
						}
					}
				}
			}
			
			td.appendChild(div);
			tr.appendChild(td);
			dateIndex++;
		}
		table.appendChild(tr);
	}
}