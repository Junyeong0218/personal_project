const mapContainer = document.querySelector("#maps");
const searcher = document.querySelector("#searcher");
const searchedPlaces = document.querySelector("#searched-places");
const startPlace = document.querySelector("#start-place");
const clearBtn = document.querySelector(".clearBtn");
const saveBtn = document.querySelector(".saveBtn");
const aside = document.querySelector("aside");

let lat = 0;
let lon = 0;

let priority = document.querySelector(".wayToSort input[checked]").id;
let options;
let map;
let marker;
let geocoder;
let customOverlay;
let polyline;
let paths = [];
let markers = [];
let placeIndex = [];
let wayPointCnt = [];
let schedulers = [];
let takenTime = [];
let originData;
let tourData = [];

const colorSet = ["#5F6366", "#4D6D9A", "#86B3D1", "#99CED3", "#EDB5BF"];

// const places = new kakao.maps.services.Places();
// 매개변수 map = 주어진 map 기준으로 검색
// setMap(map); 으로도 설정 가능

saveBtn.addEventListener("click", function () {
        saveSchedule();
});

clearBtn.addEventListener("click", function () {
        clearSchedule();
});

window.onload = function () {
        navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

        const queryString = getQueryStringObj();
        loadTourSchedule(queryString.id);
};

function getQueryStringObj() {
        const url = window.location.search.substr(1).split('&');
        if (url == "") return {};
        let obj = {};
        for (let i = 0; i < url.length; ++i) {
                const temp = url[i].split('=', 2);
                if (temp.length == 1) {
                        obj[temp[0]] = "";
                } else {
                        obj[temp[0]] = decodeURIComponent(temp[1].replace(/\+/g, " "));
                }
        }
        return obj;
}

function onGeoOk(position) {
        lat = position.coords.latitude; // 위도
        lon = position.coords.longitude; // 경도

        options = {
                center: new kakao.maps.LatLng(lat, lon),
                level: 2
        };

        map = new kakao.maps.Map(mapContainer, options); // 현재 위치 중심의 Map 출력
        // zoomControl 추가
        map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);

        marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(lat, lon)
        }); // 현재 위치에 Marker 찍기

        geocoder = new kakao.maps.services.Geocoder(); // 주소, 위경도간 변환
}

function onGeoError() {
        alert("Can't find you. No map for you.");
}

function loadTourSchedule(scheduleId) {
        $.ajax({
                type: "post",
                url: "/tour/getTourSchedules",
                data: { "scheduleId": scheduleId },
                dataType: "json",
                success: function (data) {
                        if (data.length == 0) {
                                setDefaultLayout();
                                addEventChangePriority();
                        } else {
                                originData = data;
                                addHTMLForTourList(data);
                                addEventShowEachDay();
                                addEventChangePriority();
                                loadNavi(document.querySelectorAll(".scheduler")[0]);
                        }
                },
                error: function (xhr, status, error) {
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                }
        });
}

function setDefaultLayout() {
        const scheduleId = getQueryStringObj().id;
        $.ajax({
                type: "post",
                url: "/user/getSchedule",
                data: { "scheduleId": scheduleId },
                dataType: "json",
                success: function (data) {
                        const days = getQueryStringObj().days;
                        const aside = document.querySelector("aside");
                        const wayToSort = document.querySelector(".wayToSort");
                        const dailyTourList = document.querySelector(".days");
                        for (let i = 0; i < days; i++) {
                                placeIndex.push(0);
                                wayPointCnt.push(1);
                                let startDate = new Date(data.startDate);
                                let arriveDate = new Date(data.endDate);
                                let year = startDate.getFullYear();
                                let month = startDate.getMonth() + 1;
                                let day = startDate.getDate() + i;
                                let startTime = `${String(startDate.getHours()).padStart(2, "0")}:${String(startDate.getMinutes()).padStart(2, "0")}:00`;
                                let endTime = `${String(arriveDate.getHours()).padStart(2, "0")}:${String(arriveDate.getMinutes()).padStart(2, "0")}:00`;
                                if (i == 0 && days > 1) { // 일정이 여러 날인데 첫 날인 경우
                                        endTime = `00:00:00`;
                                } else if (i == days - 1 && days > 1) { // 일정이 여러 날인데 마지막 날인 경우
                                        startTime = `00:00:00`;
                                } else if (days > 2) {				// 일정이 3일 이상인데 중간에 낀 날인 경우
                                        startTime = `00:00:00`;
                                        endTime = `00:00:00`;
                                }
                                if (day > new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate()) { // 해당 월 말일보다 day가 큰 경우 월++
                                        month++;
                                        if (month > 12) { // 월이 12를 초과한 경우 연도 증가
                                                month - 12;
                                                year++;
                                        }
                                }
                                month = String(month).padStart(2, "0");
                                day = String(day).padStart(2, "0");
                                const tourContainer = document.createElement("button");
                                tourContainer.id = 0;
                                tourContainer.type = "button";
                                tourContainer.innerHTML = `<div class="day-title">
											   <span>${i + 1}일차</span>
											   <span> (${year}-${month}-${day}) </span>
										   </div>
										   <div class="day-tour-time">
											   <span>${startTime} ~ ${endTime}</span>
										   </div>
										   <div class="day-priority">
											   <span>RECOMMEND</span>
										   </div>`;
                                dailyTourList.appendChild(tourContainer);
                        }

                        for (let i = 0; i < days; i++) {
                                const scheduler = document.createElement("div");
                                if (i == 0) {
                                        scheduler.className = "scheduler";
                                } else {
                                        scheduler.className = "scheduler hidden";
                                }

                                const startTime = dailyTourList.children[i].querySelector(".day-tour-time > span").innerText.substring(0, 8);

                                const header = document.createElement("div");
                                header.id = "schedule-header";
                                header.innerHTML = `<span>Tour Schedule</span>`;

                                const startPlace = document.createElement("div");
                                startPlace.id = "start-place";
                                startPlace.innerHTML = `<div class="place-texts">
											<span>시작 지점</span>
											<span id="" class="place-name"></span>
											<div class="times">
											 	<label for="start-time">
											 		<span class="time-title">출발 시간 : </span>
											 		<input type="time" name="start-time" class="start-time" value="${startTime}">
											 	</label>
											 	<label for="stay-time">
											 		<span class="time-title">체류 시간 : </span>
											 		<input type="text" name="stay-time" class="stay-time" readOnly value="00:00">
											 	</label>
											 </div>
										</div>
										<div class="waypointBtns">
											<button class="Deletewaypoint" type="button"></button>
											<div id="${placeIndex[i]++}">
												<div class="upIndex">
													<span></span>
												</div>
												<div class="downIndex">
													<span></span>
												</div>
											</div>
										</div>`;
                                scheduler.appendChild(header);
                                scheduler.appendChild(startPlace);
                                startPlace.querySelector(".Deletewaypoint").addEventListener("click", function () {
                                        remainPlaceFrame(startPlace);
                                });

                                const stayTimeTag = startPlace.querySelector(".stay-time");
                                addShowTimePickerEvent(stayTimeTag);

                                aside.insertBefore(scheduler, wayToSort);

                                schedulers.push(scheduler.children);
                        }
                        addEventShowEachDay();
                        for (let i = 0; i < schedulers.length; i++) {
                                for (let j = 1; j < schedulers[i].length; j++) {
                                        addChangePositionEvent(schedulers[i][j]);
                                        addDeleteWayPointEvent(schedulers[i][j]);
                                        addStartTimeChangeEvent(schedulers[i][j]);
                                }
                        }
                },
                error: function (xhr, status, error) {
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                }
        });
}

function addHTMLForTourList(tourList) {
        console.log(tourList);
        const dailyTourList = document.querySelector(".days");
        const aside = document.querySelector("aside");
        const wayToSort = document.querySelector(".wayToSort");

        for (let i = 0; i < tourList.length; i++) {
                placeIndex.push(0);
                wayPointCnt.push(1);
                const tour = tourList[i];
                console.log(tour);
                const startDate = new Date(tour.start_datetime);
                const arriveDate = new Date(tour.arrive_datetime);
                const year = startDate.getFullYear();
                const month = String(startDate.getMonth() + 1).padStart(2, "0");
                const day = String(startDate.getDate()).padStart(2, "0");
                const startTime = `${String(startDate.getHours()).padStart(2, "0")}:${String(startDate.getMinutes()).padStart(2, "0")}:${String(startDate.getSeconds()).padStart(2, "0")}`;
                const endTime = `${String(arriveDate.getHours()).padStart(2, "0")}:${String(arriveDate.getMinutes()).padStart(2, "0")}:${String(arriveDate.getSeconds()).padStart(2, "0")}`;
                const tourContainer = document.createElement("button");
                tourContainer.id = tour.id;
                tourContainer.type = "button";
                tourContainer.innerHTML = `<div class="day-title">
									   <span>${tour.title}</span>
									   <span> (${year}-${month}-${day}) </span>
								   </div>
								   <div class="day-tour-time">
									   <span>${startTime} ~ ${endTime}</span>
								   </div>
								   <div class="day-priority">
									   <span>${tour.search_priority}</span>
								   </div>`;
                dailyTourList.appendChild(tourContainer);

                const scheduler = document.createElement("div");
                if (i == 0) {
                        scheduler.className = "scheduler";
                } else {
                        scheduler.className = "scheduler hidden";
                }

                const header = document.createElement("div");
                header.id = "schedule-header";
                header.innerHTML = `<span>Tour Schedule</span>`;
                scheduler.appendChild(header);

                const places = tour.places;
                for (let j = 0; j < places.length; j++) {
                        const place = places[j];
                        const placeContainer = document.createElement("div");
                        const placeTexts = document.createElement("div");
                        placeTexts.className = "place-texts";
                        if (j == 0) {
                                placeContainer.id = "start-place";
                                placeTexts.innerHTML = `<span>시작 지점</span>`;
                        } else if (j == places.length - 1) {
                                placeContainer.id = "end-place";
                                placeTexts.innerHTML = `<span>도착지</span>`;
                        } else {
                                placeContainer.className = "middle-place";
                                placeTexts.innerHTML = `<span>경유지${wayPointCnt[i]++}</span>`;
                        }
                        const startDateTime = new Date(place.start_datetime);
                        let hour = String(startDateTime.getHours()).padStart(2, "0");
                        let minute = String(startDateTime.getMinutes()).padStart(2, "0");

                        placeTexts.innerHTML += `<span id="${place.place_id}" class="place-name">${place.place_name}</span>`;
                        if (placeContainer.id == "end-place") {
                                placeTexts.innerHTML += `<div class="times">
											 <label for="end-time">
										 		 <span class="time-title">도착 시간 : </span>
										 		 <input type="time" name="end-time" class="end-time" value="${hour}:${minute}">
										 	 </label>
									 	 </div>`;
                        } else {
                                placeTexts.innerHTML += `<div class="times">
											 <label for="start-time">
										 		 <span class="time-title">출발 시간 : </span>
										 		 <input type="time" name="start-time" class="start-time" value="${hour}:${minute}">
										 	 </label>
										 	 <label for="stay-time">
										 		 <span class="time-title">체류 시간 : </span>
										 		 <input type="text" name="stay-time" class="stay-time" readOnly value="">
										 	 </label>
									 	 </div>`;
                        }
                        placeTexts.innerHTML += `<span class="hidden">${place.place_address}</span>
										<span id="x" class="hidden">${place.coord_x}</span>
										<span id="y" class="hidden">${place.coord_y}</span>`;
                        placeContainer.appendChild(placeTexts);
                        placeIndex[i] = place.index;
                        placeContainer.innerHTML += `<div class="waypointBtns">
											<button class="Deletewaypoint" type="button"></button>
											<div id="${placeIndex[i]}">
												<div class="upIndex">
													<span></span>
												</div>
												<div class="downIndex">
													<span></span>
												</div>
											</div>
										</div>`;
                        scheduler.appendChild(placeContainer);

                        if (placeContainer.id == "start-place" || placeContainer.id == "end-place") {
                                placeContainer.querySelector(".Deletewaypoint").addEventListener("click", function () {
                                        remainPlaceFrame(placeContainer);
                                });
                        }

                        if (placeContainer.id != "end-place") {
                                const stayTimeTag = placeContainer.querySelector(".stay-time");
                                const stayTime = String(place.stay_time).split(":");
                                hour = stayTime[0] * 1;
                                minute = stayTime[1] * 1;
                                if (hour == "00") {
                                        if (minute == "00") {
                                                stayTimeTag.value = "0시간 0분";
                                        } else {
                                                stayTimeTag.value = `${minute}분`;
                                        }
                                } else {
                                        if (minute == "00") {
                                                stayTimeTag.value = `${hour}시간`;
                                        } else {
                                                stayTimeTag.value = `${hour}시간 ${minute}분`;
                                        }
                                }
                                addShowTimePickerEvent(stayTimeTag);
                        }
                }
                aside.insertBefore(scheduler, wayToSort);

                schedulers.push(scheduler.children);
                for (let j = 1; j < schedulers[i].length; j++) {
                        addChangePositionEvent(schedulers[i][j]);
                        addDeleteWayPointEvent(schedulers[i][j]);
                        addStartTimeChangeEvent(schedulers[i][j]);
                }
        }
}

function addEventShowEachDay() {
        const controlButtons = document.querySelector(".days").children;
        const wayToSort = document.querySelector(".wayToSort");

        for (let i = 0; i < controlButtons.length; i++) {
                const btn = controlButtons[i];

                btn.addEventListener("click", function () {
                        for (let j = 0; j < schedulers.length; j++) {
                                const scheduler = schedulers[j][0].parentElement;
                                if (i == j) {
                                        scheduler.className = "scheduler";
                                        const prior = btn.querySelector(".day-priority > span").innerText;
                                        wayToSort.querySelector(`input[id="${prior}"]`).checked = true;
                                        priority = prior;
                                        loadNavi(scheduler);
                                } else {
                                        scheduler.className = "scheduler hidden";
                                }
                        }
                });
        }
}

function addEventChangePriority() {
        const sorting = document.querySelector(".wayToSort").children;
        for (let i = 1; i < sorting.length; i++) {
                sorting[i].addEventListener("click", function () {
                        priority = sorting[i].querySelector("input").id;
                        const scheduler = getCurrentScheduler();
                        const schedulerIndex = getCurrentSchedulerIndex();
                        const daysChildren = document.querySelector(".days").children;
                        daysChildren[schedulerIndex].querySelector(".day-priority > span").innerText = priority;
                        loadNavi(scheduler);
                });
        }
}

function remainPlaceFrame(place) {
        const placeTexts = place.querySelector(".place-texts");
        placeTexts.textContent = "";
        const span = document.createElement("span");
        span.innerText = place.id == "start-place" ? "시작 지점" :
                place.id == "end-place" ? "도착지" : "";
        placeTexts.appendChild(span);

        placeTexts.innerHTML += `<span id="" class="place-name"></span>`;

        if (place.id == "start-place") {
                placeTexts.innerHTML += `<div class="times">
								 	 <label for="start-time">
								 		 <span class="time-title">출발 시간 : </span>
								 		 <input type="time" name="start-time" id="start-time" value="00:00">
								 	 </label>
								 	 <label for="stay-time">
								 		 <span class="time-title">체류 시간 : </span>
								 		 <input type="text" name="stay-time" id="stay-time" readOnly value="00:00">
								 	 </label>
								  </div>`;
        } else {
                placeTexts.innerHTML += `<div class="times">
								 	<label for="end-time">
								 		<span class="time-title">도착 시간 : </span>
								 		<input type="time" name="end-time" id="end-time" value="00:00">
								 	</label>
								 </div>`;
        }

        AddChangePositionEvent(place);
}

function collectTourData() {
        tourData = [];
        const queryStringObj = getQueryStringObj();
        for (let i = 0; i < schedulers.length; i++) {
                // 각 일자별로 반복 / 카드 date 받기
                const days = document.querySelector(".days").children;

                const tourTime = days[i].querySelector(".day-tour-time > span").innerText;
                let startDate = new Date(days[i].querySelector(".day-title").children[1].innerText.trim().substring(1, 11));
                let year = startDate.getFullYear();
                let month = String(startDate.getMonth() + 1).padStart(2, "0");
                let day = String(startDate.getDate()).padStart(2, "0");
                const tourStartDateTime = `${year}-${month}-${day}T${tourTime.substring(0, 8)}`;

                const endTime = tourTime.substring(11, 19);
                const endDay = endTime.substring(0, 2) * 1 < 6 ? String(day + 1).padStart(2, "0") : day;
                let tourArriveDateTime = `${year}-${month}-${endDay}T${endTime}`;
                const tour = {
                        "id": days[i].id,
                        "scheduleId": queryStringObj.id,
                        "title": days[i].querySelector(".day-title").children[0].innerText,
                        "description": days[i].querySelector(".day-title").children[0].innerText,
                        "search_priority": days[i].querySelector(".day-priority > span").innerText,
                        "start_datetime": tourStartDateTime,
                        "arrive_datetime": tourArriveDateTime,
                        "places": []
                };
                const scheduler = schedulers[i];
                for (let j = 0; j < scheduler.length; j++) {
                        // schedulerHeader & taken-time 제외하고 collect
                        const place = scheduler[j];
                        if (place.id == "schedule-header" || place.className == "taken-time") {
                                continue;
                        }

                        const placeTexts = place.querySelector(".place-texts");
                        const place_id = placeTexts.querySelector(".place-name").id.trim();
                        const place_name = placeTexts.querySelector(".place-name").innerText.trim();
                        let startTime;
                        if (place.id != "end-place") {
                                startTime = `${placeTexts.querySelector(".start-time").value}`.length < 6 ? `${placeTexts.querySelector(".start-time").value}:00`
                                        : `${placeTexts.querySelector(".start-time").value}`;
                        } else {
                                startTime = `${placeTexts.querySelector(".end-time").value}`.length < 6 ? `${placeTexts.querySelector(".end-time").value}:00`
                                        : `${placeTexts.querySelector(".end-time").value}`;
                        }
                        const place_startTime = `${year}-${month}-${day}T${startTime}`;
                        let place_stayTime = "00:00:00";
                        if (place.id != "end-place") {
                                const stayTime = placeTexts.querySelector(".stay-time").value;
                                let hour = stayTime.indexOf("시간") == -1 ? "00" : stayTime.substring(0, stayTime.indexOf("시간")).padStart(2, "0");
                                let minute = stayTime.indexOf("시간") == -1 ? stayTime.substring(0, stayTime.indexOf("분")).padStart(2, "0")
                                        : stayTime.indexOf("분") == -1 ? "00" : stayTime.substring(stayTime.indexOf("시간") + 3, stayTime.indexOf("분")).padStart(2, "0");
                                place_stayTime = `${hour}:${minute}:00`;
                        }
                        const place_coordX = place.querySelector("#x").innerText.trim();
                        const place_coordY = place.querySelector("#y").innerText.trim();
                        const place_address = place.querySelector("#x").previousElementSibling.innerText.trim();
                        const place_index = place.querySelector(".waypointBtns > div").id;
                        const eachPlace = {
                                "coord_x": place_coordX,
                                "coord_y": place_coordY,
                                "index": place_index,
                                "place_address": place_address,
                                "place_id": place_id,
                                "place_name": place_name,
                                "start_datetime": place_startTime,
                                "stay_time": place_stayTime,
                                "tourId": days[i].id
                        };
                        tour.places.push(eachPlace);
                }
                tourData.push(tour);
        }
}

function saveSchedule() {
        collectTourData();
        console.log(tourData);
        if (originData == null) {
                /* insert */
                const data = {
                        "originTour": originData,
                        "changedTour": tourData
                };
                $.ajax({
                        type: "post",
                        url: "/tour/insertTourSchedules",
                        data: JSON.stringify(data),
                        contentType: "application/json",
                        success: function (data) {
                                console.log(data);
                        },
                        error: function (xhr, status, error) {
                                console.log(xhr);
                                console.log(status);
                                console.log(error);
                        }
                });
        } else {
                /* update & delete */
                const data = {
                        "originTour": originData,
                        "changedTour": tourData
                };
                $.ajax({
                        type: "post",
                        url: "/tour/updateTourSchedules",
                        data: JSON.stringify(data),
                        contentType: "application/json",
                        success: function (data) {
                                console.log(data); // 성공 시 로직 작성하기 
                        },
                        error: function (xhr, status, error) {
                                console.log(xhr);
                                console.log(status);
                                console.log(error);
                        }
                });
        }
}

function clearSchedule() {
        const scheduler = getCurrentScheduler();
        const schedulerIndex = getCurrentSchedulerIndex();
        scheduler.textContent = "";

        const header = document.createElement("div");
        header.id = "schedule-header";
        header.innerHTML = `<span>Tour Schedule</span>`;

        const startPlace = document.createElement("div");
        startPlace.id = "start-place";
        startPlace.innerHTML = `<div class="place-texts">
								<span>시작 지점</span>
								<span id="" class="place-name"></span>
								<div class="times">
								 	<label for="start-time">
								 		<span class="time-title">출발 시간 : </span>
								 		<input type="time" name="start-time" class="start-time" value="00:00">
								 	</label>
								 	<label for="stay-time">
								 		<span class="time-title">체류 시간 : </span>
								 		<input type="text" name="stay-time" class="stay-time" readOnly value="00:00">
								 	</label>
								 </div>
							</div>
							<div class="waypointBtns">
								<button class="Deletewaypoint" type="button"></button>
								<div id="${placeIndex[schedulerIndex]++}">
									<div class="upIndex">
										<span></span>
									</div>
									<div class="downIndex">
										<span></span>
									</div>
								</div>
							</div>`;

        scheduler.appendChild(header);
        scheduler.appendChild(startPlace);

        const stayTimeTag = startPlace.querySelector(".stay-time");
        addShowTimePickerEvent(stayTimeTag);

        startPlace.querySelector(".Deletewaypoint").addEventListener("click", function () {
                remainPlaceFrame(startPlace);
        });
}

function addStartTimeChangeEvent(place) {
        if (place.id != "end-place") {
                const startTime = place.querySelector(".start-time");
                startTime.addEventListener("change", function () {
                        const scheduler = getCurrentScheduler();
                        const schedulerIndex = getCurrentSchedulerIndex();
                        const days = document.querySelectorAll(".days")[0].children;
                        const dayTourTime = days[schedulerIndex].querySelector(".day-tour-time > span");
                        const endTime = dayTourTime.innerText.substring(8, dayTourTime.innerText.length);
                        dayTourTime.innerText = `${startTime.value}:00${endTime}`;
                        loadNavi(scheduler);
                });
        }
}

function addShowTimePickerEvent(stayTimeTag) {
        stayTimeTag.addEventListener("click", function () {
                showTimePicker(stayTimeTag);
        });
}

function getCurrentScheduler() {
        for (let i = 0; i < schedulers.length; i++) {
                let scheduler = schedulers[i][0].parentElement;
                let classCnt = scheduler.classList.length;
                if (classCnt == 1) {
                        return scheduler;
                }
        }
}

function getCurrentSchedulerIndex() {
        const schedulers = aside.querySelectorAll(".scheduler");
        for (let i = 0; i < schedulers.length; i++) {
                const classCnt = schedulers[i].classList.length;
                if (classCnt == 1) {
                        return i;
                }
        }
}

function moveCenter(latLng) {
        marker.setMap(map);
        marker.setPosition(latLng);
        map.panTo(latLng, 100);
}

function showPlaceInfo(latLng) {
        showPlaceInfo(latLng, null);
}

function showPlaceInfo(latLng, placeName) {
        const callback = function (result, status) {
                if (status === kakao.maps.services.Status.OK) {
                        if (customOverlay != null) {
                                customOverlay.setMap(null);
                        }

                        let address;
                        if (result[0].road_address != null) {
                                address = result[0].road_address.address_name;
                        } else {
                                address = result[0].address.address_name;
                        }

                        $.ajax({
                                type: "get",
                                url: `https://dapi.kakao.com/v2/local/search/keyword.json?query=${placeName == null ? address : placeName}&x=${latLng.getLng()}&y=${latLng.getLat()}&sort=accuracy&`,
                                headers: { "Authorization": "KakaoAK abd8abba6430208eec39d8f882753415" },
                                success: function (data) {
                                        console.log(data);
                                        const documents = data.documents;
                                        createOverlay(latLng, documents, placeName, address);
                                },
                                error: function (xhr, status, error) {
                                        console.log(xhr);
                                        console.log(status);
                                        console.log(error);
                                }
                        }); // ajax Ended
                }
        } // callback Ended
        geocoder.coord2Address(latLng.getLng(), latLng.getLat(), callback);
}

function createOverlay(latLng, documents, placeName, address) {
        let place;
        if (placeName != null) {
                for (let i = 0; i < documents.length; i++) {
                        if (documents[i].place_name == placeName) {
                                place = documents[i];
                                break;
                        }
                }
        }

        let contents = `<div class="placeOverlay">
					<div id="overlay-closer"></div>
			   		<div class="overlay-title">
			   			<span class="overlay-placename">${place == null ? documents[0].place_name : place.place_name}</span>
			   			<span class="overlay-address">${address}</span>
			   		</div>
			   		<div class="overlay-details">
			   			<div class="overlay-detail">
			   			
			   			</div>
			   			<div class="overlay-btns">
			   				<button class="overlay-btn" type="button">
			   					<span>시작지로 설정</span>
			   				</button>
			   				<button class="overlay-btn" type="button">
			   					<span>경유지로 추가</span>
			   				</button>
			   				<button class="overlay-btn" type="button">
			   					<span>도착지로 설정</span>
			   				</button>
			   			</div>
			   		</div>
			   <div>`;

        customOverlay = new kakao.maps.CustomOverlay({
                position: latLng,
                content: contents,
                xAncoer: 0.5,
                yAnchor: 1.1
        });

        customOverlay.setMap(map);

        const overlayCloser = document.querySelector("#overlay-closer");
        overlayCloser.addEventListener("click", function () {
                customOverlay.setMap(null);
        });

        let btns = document.querySelectorAll(".overlay-btns")[0].children;

        btns[0].addEventListener("click", function (event) {
                event.preventDefault();
                const scheduler = getCurrentScheduler();
                const startPlace = scheduler.querySelector("#start-place");
                const placeNameTag = startPlace.querySelector(".place-name");
                placeNameTag.innerText = place == null ? documents[0].place_name : place.place_name;
                placeNameTag.id = place == null ? documents[0].id : place.id;

                addAdressTag(startPlace, address);
                addPlaceCoordTag(startPlace, documents, place);
                addChangePositionEvent(startPlace);

                loadNavi(scheduler);
        });

        btns[1].addEventListener("click", function (event) {
                event.preventDefault();
                const scheduler = getCurrentScheduler();
                const schedulerIndex = getCurrentSchedulerIndex();
                const endPlace = scheduler.querySelector("#end-place");
                let waypoint = document.createElement("div");
                waypoint.className = "middle-place";
                waypoint.innerHTML = `<div class="place-texts">
								  <span>경유지${wayPointCnt[schedulerIndex]++}</span>
								  <span id="${place == null ? documents[0].id : place.id}" class="place-name">
								  		${place == null ? documents[0].place_name : place.place_name}
								  </span>
								  <div class="times">
									  <label for="start-time">
										  <span class="time-title">출발 시간 : </span>
										  <input type="time" name="start-time" class="start-time">
									  </label>
									  <label for="stay-time">
										  <span class="time-title">체류 시간 : </span>
										  <input type="text" name="stay-time" class="stay-time" readonly value="00:00">
									  </label>
								  </div>
							  </div>
							  <div class="waypointBtns">
								  <button class="Deletewaypoint" type="button"></button>
								  <div id="${placeIndex[schedulerIndex]++}">
									  <div class="upIndex">
										  <span></span>
									  </div>
									  <div class="downIndex">
										  <span></span>
									  </div>
								  </div>
							  </div>`;
                if (endPlace != null) {
                        scheduler.insertBefore(waypoint, endPlace);
                } else {
                        scheduler.appendChild(waypoint);
                }

                const stayTimeTag = waypoint.querySelector(".stay-time");
                addShowTimePickerEvent(stayTimeTag);
                addAdressTag(waypoint, address);
                addPlaceCoordTag(waypoint, documents, place);
                addDeleteWayPointEvent(waypoint);
                addChangePositionEvent(waypoint);

                loadNavi(scheduler);
        });

        btns[2].addEventListener("click", function (event) {
                event.preventDefault();
                const scheduler = getCurrentScheduler();
                const schedulerIndex = getCurrentSchedulerIndex();
                let endPlace = scheduler.querySelector("#end-place");
                if (endPlace != null) {
                        remainPlaceFrame(endPlace);

                        const endPlaceTag = endPlace.querySelector(".place-name");
                        endPlaceTag.innerText = place == null ? documents[0].place_name : place.place_name;
                        endPlaceTag.id = place == null ? documents[0].id : place.id;
                } else {
                        endPlace = document.createElement("div");
                        endPlace.id = "end-place";
                        endPlace.innerHTML = `<div class="place-texts">
								  <span>도착지</span>
								  <span id="${place == null ? documents[0].id : place.id}" class="place-name">
								  		${place == null ? documents[0].place_name : place.place_name}
								  </span>
								  <div class="times">
								 	  <label for="end-time">
								 		  <span class="time-title">도착 시간 : </span>
								 		  <input type="time" name="end-time" class="end-time">
								 	  </label>
								  </div>
							  </div>
							  <div class="waypointBtns">
							  	  <button class="Deletewaypoint" type="button"></button>
							  	  <div id="${placeIndex[schedulerIndex]++}">
									  <div class="upIndex">
										  <span></span>
									  </div>
									  <div class="downIndex">
										  <span></span>
									  </div>
								  </div>
							  </div>`;
                        scheduler.appendChild(endPlace);
                }

                addAdressTag(endPlace, address);
                addPlaceCoordTag(endPlace, documents, place);
                addDeleteWayPointEvent(endPlace);
                addChangePositionEvent(endPlace);

                loadNavi(scheduler);
        });
}

function addAdressTag(eachPlace, address) {
        const prevTag = eachPlace.querySelector("#address");
        if (prevTag != null) {
                prevTag.remove();
        }
        const placeTexts = eachPlace.querySelector(".place-texts");

        const span = document.createElement("span");
        span.id = "address";
        span.className = "hidden";
        span.innerText = address;

        placeTexts.appendChild(span);
}

function addPlaceCoordTag(eachPlace, documents, place) {
        const prevTag = eachPlace.querySelector("#x");
        if (prevTag != null) {
                prevTag.remove();
                eachPlace.querySelector("#y").remove();
        }
        const placeTexts = eachPlace.querySelector(".place-texts");

        let span = document.createElement("span");
        span.id = "x";
        span.className = "hidden";
        span.innerText = place == null ? documents[0].x : place.x;
        placeTexts.appendChild(span);

        span = document.createElement("span");
        span.id = "y";
        span.className = "hidden";
        span.innerText = place == null ? documents[0].y : place.y;
        placeTexts.appendChild(span);
}

function addDeleteWayPointEvent(eachPlace) {
        const deleteBtn = eachPlace.querySelector(".Deletewaypoint");
        let schedulerIndex = getCurrentSchedulerIndex();
        if (eachPlace.id == "start-place" || eachPlace.id == "end-place") {
                deleteBtn.addEventListener("click", function () {
                        remainPlaceFrame(eachPlace);
                });
        } else {
                deleteBtn.addEventListener("click", function () {
                        if (eachPlace.id == "") {
                                placeIndex[schedulerIndex]--;
                                wayPointCnt[schedulerIndex]--;
                        }
                        eachPlace.remove();
                        adjustWayPointCnt();

                        const scheduler = getCurrentScheduler();
                        loadNavi(scheduler);
                });
        }
}

function addChangePositionEvent(eachPlace) {
        const scheduler = eachPlace.parentElement;
        const upBtn = eachPlace.querySelector(".upIndex");
        const downBtn = eachPlace.querySelector(".downIndex");

        upBtn.addEventListener("click", function () {
                if (eachPlace.id != "start-place") {
                        removeTakenTimeTags();

                        const beforeElement = eachPlace.previousElementSibling;

                        if (eachPlace.id == "end-place") {
                                /* ? <- end */
                                const beforeTimeTitle = beforeElement.querySelector(".time-title");
                                beforeTimeTitle.innerText = "도착 시간 : ";

                                const beforeStartTime = beforeElement.querySelector(".start-time");
                                beforeStartTime.name = "end-time";
                                beforeStartTime.className = "end-time";

                                const beforeStartTimeLabel = beforeStartTime.parentElement;
                                beforeStartTimeLabel.for = "end-time";

                                const beforeStayTimeLabel = beforeElement.querySelector(".stay-time").parentElement;

                                const endTimeTitle = eachPlace.querySelector(".time-title");
                                endTimeTitle.innerText = "출발 시간 : ";

                                const endTime = eachPlace.querySelector(".end-time");
                                endTime.name = "start-time";
                                endTime.className = "start-time";

                                const endTimeLabel = endTime.parentElement;
                                endTimeLabel.for = "start-time";

                                eachPlace.querySelector(".start-time").value = beforeStartTime.value;
                                eachPlace.querySelector(".times").appendChild(beforeStayTimeLabel);

                                scheduler.insertBefore(eachPlace, beforeElement);
                        } else if (eachPlace.id != "end-place") {
                                /* start or way <- way */
                                const beforeStartTime = beforeElement.querySelector(".start-time").value;
                                eachPlace.querySelector(".start-time").value = beforeStartTime;

                                scheduler.insertBefore(eachPlace, beforeElement);
                        }

                        renameIdAndClass();
                        loadNavi(scheduler);
                }
        });

        downBtn.addEventListener("click", function () {
                if (eachPlace.id != "end-place") {
                        removeTakenTimeTags();

                        const nextElement = eachPlace.nextElementSibling;

                        if (nextElement.id == "end-place") {
                                /* ? -> end */
                                const endTimeTitle = nextElement.querySelector(".time-title");
                                endTimeTitle.innerText = "출발 시간 : ";

                                const endTime = nextElement.querySelector(".end-time");
                                endTime.name = "start-time";
                                endTime.className = "start-time";

                                const endTimeLabel = endTime.parentElement;
                                endTimeLabel.for = "start-time";

                                const currentTimeTitle = eachPlace.querySelector(".time-title");
                                currentTimeTitle.innerText = "도착 시간 : ";

                                const startTime = eachPlace.querySelector(".start-time");
                                startTime.name = "end-time";
                                startTime.className = "end-time";

                                const startTimeLabel = startTime.parentElement;
                                startTimeLabel.for = "end-time";

                                const currentStayTimeLabel = eachPlace.querySelector(".stay-time").parentElement;

                                nextElement.querySelector(".start-time").value = startTime.value;
                                nextElement.querySelector(".times").appendChild(currentStayTimeLabel);

                                scheduler.insertBefore(nextElement, eachPlace);
                        } else {
                                /* start or way -> way */
                                const currentStartTime = eachPlace.querySelector(".start-time").value;
                                nextElement.querySelector(".start-time").value = currentStartTime;

                                scheduler.insertBefore(nextElement, eachPlace);
                        }

                        renameIdAndClass();
                        loadNavi(scheduler);
                }
        });
}

function renameIdAndClass() {
        const scheduler = getCurrentScheduler();
        const schedulerIndex = getCurrentSchedulerIndex();
        placeIndex[schedulerIndex] = 0;
        wayPointCnt[schedulerIndex] = 1;
        const children = scheduler.children;

        for (let i = 1; i < children.length; i++) {
                const child = children[i];
                if (i == 1) {
                        child.id = "start-place";
                        child.className = "";
                        child.querySelector(".place-texts > span").innerText = "시작 지점";
                        child.querySelector(".waypointBtns > div").id = placeIndex[schedulerIndex]++;
                } else if (i == children.length - 1) {
                        child.id = "end-place";
                        child.className = "";
                        child.querySelector(".place-texts > span").innerText = "도착지";
                        child.querySelector(".waypointBtns > div").id = placeIndex[schedulerIndex]++;
                } else {
                        child.id = "";
                        child.className = "middle-place";
                        child.querySelector(".place-texts > span").innerText = `경유지${wayPointCnt[schedulerIndex]++}`;
                        child.querySelector(".waypointBtns > div").id = placeIndex[schedulerIndex]++;
                }
        }
}

function adjustWayPointCnt() {
        const scheduler = getCurrentScheduler();
        const wayPoints = scheduler.querySelectorAll(".middle-place");
        let index = 0;
        for (let i = 0; i < wayPoints.length; i++) {
                const titleTag = wayPoints[i].querySelector(".place-texts").firstChild.nextSibling;
                const number = titleTag.innerText.substring(3, titleTag.innerText.length);

                if (number == `${i + 1}`) {
                        index = number * 1;
                } else {
                        titleTag.innerText = `경유지${index + 1}`;
                        index++;
                }
        }
}

function searchKeyword() {
        searchedPlaces.textContent = "";
        const keyword = searcher.value;
        const documents = [];
        let page = 1;
        let is_end = false;
        for (let i = 0; i < 3; i++) {
                $.ajax({
                        type: "get",
                        url: `https://dapi.kakao.com/v2/local/search/keyword.json`,
                        headers: { "Authorization": "KakaoAK abd8abba6430208eec39d8f882753415" },
                        async: false,
                        data: {
                                "query": keyword,
                                "page": page,
                                "size": 15,
                                "sort": "accuracy"
                        },
                        success: function (data) {
                                documents.push(data.documents);

                                is_end = data.meta.is_end;
                                if (is_end == false) {
                                        page++;
                                }
                        },
                        error: function (xhr, status, error) {
                                console.log(xhr);
                                console.log(status);
                                console.log(error);
                        }
                });
        }
        addSearchResult(documents);
}

function addSearchResult(documents) {
        for (let i = 0; i < documents.length; i++) {
                const doc = documents[i];
                for (let j = 0; j < doc.length; j++) {
                        const placeId = doc[j].id;
                        let isExist = false;
                        const list = searchedPlaces.children;
                        for (let k = 0; k < list.length; k++) {
                                if (list[k].id == placeId) {
                                        isExist = true;
                                        break;
                                }
                        }
                        if (isExist == false) {
                                const li = document.createElement("li");
                                li.id = placeId;
                                li.className = "searched-place";
                                li.innerHTML = `<div>
									<a href="${doc[j].place_url}" target="_blank">${doc[j].place_name}</a>
									<span>${doc[j].address_name}</span>
								</div>`;

                                const latLng = new kakao.maps.LatLng(doc[j].y, doc[j].x);

                                li.addEventListener("mouseover", function () {
                                        moveCenter(latLng);
                                });
                                li.addEventListener("click", function () {
                                        showPlaceInfo(latLng, doc[j].place_name);

                                        searchedPlaces.textContent = "";
                                });
                                searchedPlaces.appendChild(li);
                        }
                }
        }
}

function removeTakenTimeTags() {
        const scheduler = getCurrentScheduler();
        const takenTimeTags = scheduler.querySelectorAll(".taken-time");
        if (takenTimeTags.length > 0) {
                for (let i = 0; i < takenTimeTags.length; i++) {
                        takenTimeTags[i].remove();
                }
        }
}

function addEachDuration() {
        removeTakenTimeTags();
        renameIdAndClass();
        const scheduler = getCurrentScheduler();

        for (let i = 0; i < takenTime.length; i++) {
                const duration = takenTime[i];
                const second = duration % 60;
                let minute = Math.trunc(duration / 60);
                let hour = 0;
                if (minute > 59) {
                        hour = Math.trunc(minute / 60);
                        minute -= hour * 60;
                }
                let durationMessage = "";
                if (hour != 0) durationMessage += `${hour}시간 `;
                if (minute != 0) durationMessage += `${minute}분 `;
                if (second != 0) durationMessage += `${second}초 `;

                const div = document.createElement("div");
                div.className = "taken-time";
                div.innerHTML += `<div>
						  	  <span><span>
						  </div>
						  <div>
						  	  <span>자가용 이동시간 : </span>
						  	  <span id="${duration}" class="duration">${durationMessage}<span>
						  </div>`;
                let nextPlace = scheduler.children[i * 2 + 2];
                scheduler.insertBefore(div, nextPlace);
        }
}

function setTimesWithTakenTimes() {
        const schedulerChildren = getCurrentScheduler().children;
        let beforeStartTime;
        let beforeStayTime;
        let driveTime;
        for (let i = 1; i < schedulerChildren.length; i++) {
                if (i == 1) {
                        beforeStartTime = schedulerChildren[i].querySelector(".start-time").value.split(":");
                        beforeStayTime = schedulerChildren[i].querySelector(".stay-time").value;
                } else if (i % 2 == 0) {
                        driveTime = schedulerChildren[i].querySelector(".duration").id * 1;
                } else {
                        let second = driveTime % 60;
                        let minute = beforeStartTime[1] * 1;
                        let hour = beforeStartTime[0] * 1;

                        let driveMinute = Math.trunc(driveTime / 60);
                        minute += driveMinute;

                        if (second > 31) minute++;
                        second = 0;

                        if (beforeStayTime.indexOf(":") != -1) {
                                const splited = beforeStayTime.split(":");
                                hour += splited[0] * 1;
                                minute += splited[1] * 1;
                        } else if (beforeStayTime.indexOf("시간") != -1) {
                                let splited = beforeStayTime.split("시간");
                                hour += splited[0] * 1;
                                if (splited[1].indexOf("분") != -1) {
                                        splited = splited[1].split("분");
                                        minute += splited[0] * 1;
                                }
                        } else if (beforeStayTime.indexOf("분") != -1) {
                                const splited = beforeStayTime.split("분");
                                minute += splited[0] * 1;
                        }

                        if (minute > 59) {
                                const tempHour = Math.trunc(minute / 60);
                                minute -= tempHour * 60;
                                hour += tempHour;
                        }

                        if (hour > 23) hour -= 24;

                        const formattedHour = String(hour).padStart(2, "0");
                        const formattedMinute = String(minute).padStart(2, "0");

                        if (schedulerChildren[i].id == "end-place") {
                                const endTime = schedulerChildren[i].querySelector(".end-time");
                                endTime.value = `${formattedHour}:${formattedMinute}`;

                                const schedulerIndex = getCurrentSchedulerIndex();
                                const daysChildren = document.querySelector(".days").children;
                                const dayTourTime = daysChildren[schedulerIndex].querySelector(".day-tour-time > span");
                                const startTourTime = dayTourTime.innerText.substring(0, 11);
                                dayTourTime.innerText = `${startTourTime}${formattedHour}:${formattedMinute}:00`;
                        } else {
                                const startTime = schedulerChildren[i].querySelector(".start-time");
                                startTime.value = `${formattedHour}:${formattedMinute}`;
                                beforeStartTime = startTime.value.split(":");
                                beforeStayTime = schedulerChildren[i].querySelector(".stay-time").value;
                        }
                }
        }
}

function loadNavi(scheduler) {
        const startPlace = scheduler.querySelector("#start-place");
        const endPlace = scheduler.querySelector("#end-place");
        const middlePlaces = scheduler.querySelectorAll(".middle-place");

        if (startPlace == null || endPlace == null || middlePlaces == null) {
                return;
        }

        erasePolyline();
        eraseMarkers();

        const startPlaceName = startPlace.querySelector(".place-name").innerText;
        const endPlaceName = endPlace.querySelector(".place-name").innerText;
        let placeNames = [startPlaceName];

        const origin = {
                "x": startPlace.querySelector("#x").innerText,
                "y": startPlace.querySelector("#y").innerText
        }
        const destination = {
                "x": endPlace.querySelector("#x").innerText,
                "y": endPlace.querySelector("#y").innerText
        }
        const wayPoints = [];

        middlePlaces.forEach(e => {
                const wayPoint = {
                        "name": e.querySelector(".place-name").innerText,
                        "x": e.querySelector("#x").innerText,
                        "y": e.querySelector("#y").innerText
                }
                placeNames.push(e.querySelector(".place-name").innerText);
                wayPoints.push(wayPoint);
        });
        placeNames.push(endPlaceName);

        data = wayPoints.length == 0 ? {
                "origin": origin,
                "destination": destination,
                "priority": priority,
                "alternatives": true
        } : {
                "origin": origin,
                "destination": destination,
                "waypoints": wayPoints,
                "priority": priority,
                "alternatives": true
        };

        const url = "https://apis-navi.kakaomobility.com/v1/waypoints/directions";

        $.ajax({
                type: "post",
                url: url,
                headers: {
                        "Authorization": "KakaoAK abd8abba6430208eec39d8f882753415",
                        "Content-Type": "application/json; charset=UTF-8"
                },
                data: JSON.stringify(data),
                success: function (data) {
                        if (marker != null) {
                                marker.setMap(null);
                        }
                        if (customOverlay != null) {
                                customOverlay.setMap(null);
                        }

                        let fastestIndex = 0;
                        let prevDuration = 0;
                        if (data.routes.length > 1) {
                                for (let i = 0; i < data.routes.length; i++) {
                                        if (i == 0) {
                                                prevDuration = data.routes[i].summary.duration;
                                        } else if (prevDuration > data.routes[i].summary.duration) {
                                                fastestIndex = i;
                                                prevDuration = data.routes[i].summary.duration;
                                        }
                                }
                        }
                        const sections = data.routes[fastestIndex].sections;

                        showSections(sections, placeNames);
                },
                error: function (xhr, status, error) {
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                }
        });
}

function showSections(sections, placeNames) {
        let min_x;
        let min_y;
        let max_x;
        let max_y;
        let i = 0;
        takenTime = [];
        sections.forEach(e => {
                if (sections[0] == e) {
                        const bound = e.bound;
                        min_x = bound.min_x;
                        min_y = bound.min_y;
                        max_x = bound.max_x;
                        max_y = bound.max_y;
                }

                /*const firstGuide = e.guides[0];*/
                const startPosition = new kakao.maps.LatLng(e.guides[0].y, e.guides[0].x);
                const startMarkerIndex = i;

                addMarkers(startPosition, placeNames[startMarkerIndex]);
                i++;

                if (sections[sections.length - 1] == e) {
                        const endPosition = new kakao.maps.LatLng(e.guides[e.guides.length - 1].y, e.guides[e.guides.length - 1].x);
                        const endMarkerIndex = i;

                        addMarkers(endPosition, placeNames[endMarkerIndex]);
                }

                let duration = 0;
                e.roads.forEach(ie => {
                        const vertexes = ie.vertexes;
                        duration += ie.duration;

                        for (let i = 0; i < vertexes.length; i++) {
                                paths.push(new kakao.maps.LatLng(vertexes[i + 1], vertexes[i]));
                                if (vertexes[i] < min_x) min_x = vertexes[i];
                                if (vertexes[i] > max_x) max_x = vertexes[i];
                                if (vertexes[i + 1] < min_y) min_y = vertexes[i + 1];
                                if (vertexes[i + 1] > max_y) max_y = vertexes[i + 1];
                                i++;
                        }
                }); // end road forEach
                takenTime.push(duration);
        }); // end section forEach
        /*const colorIndex = Math.floor(Math.random() * 5);
        console.log(colorIndex);
        console.log(colorSet[colorIndex]);*/
        /* 원색 (주황색, 살색, 초록색 제외) "#0000ff"*/

        polyline = new kakao.maps.Polyline({
                map: map,
                path: paths,
                strokeWeight: 5,
                strokeColor: "#0000ff",
                strokeOpacity: 0.8
        });

        addEachDuration();
        setTimesWithTakenTimes();

        polyline.setMap(map);

        const bounds = new kakao.maps.LatLngBounds();
        bounds.extend(new kakao.maps.LatLng(min_y, min_x));
        bounds.extend(new kakao.maps.LatLng(max_y, max_x));

        map.setBounds(bounds);
        // setBounds minToMax

} // end function

function addMarkers(latLng, placeName) {
        const marker = new kakao.maps.Marker({
                position: latLng
        });
        marker.setMap(map);

        kakao.maps.event.addListener(marker, "click", function () {
                showPlaceInfo(latLng, placeName);
        });

        markers.push(marker);
}

function eraseMarkers() {
        if (markers != null) {
                markers.forEach(e => {
                        e.setMap(null);
                });
                markers = [];
        }
}

function erasePolyline() {
        if (polyline != null) {
                polyline.setMap(null);
                poltline = null;
                paths = [];
        }
}
