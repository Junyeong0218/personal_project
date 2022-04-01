const mapContainer = document.querySelector("#maps");
const searcher = document.querySelector("#searcher");
const searchedPlaces = document.querySelector("#searched-places");
const clearBtn = document.querySelector(".clearBtn");
const saveBtn = document.querySelector(".saveBtn");
const aside = document.querySelector("aside");
const dailyTourList = document.querySelector(".days");
const wayToSort = document.querySelector(".wayToSort");

let days;
let scheduleId;

let lat = 0;
let lon = 0;

let options;
let map;
let marker;
let geocoder;
let customOverlay;
let polyline;
let paths = [];
let markers = [];
let schedulers = [];
let takenTime = [];
let originData;
let tourData = [];

function Tour() {
        this.id = 0;
        this.scheduleId = 0;
        this.title = "";
        this.description = "";
        this.search_priority = "";
        this.start_datetime = "";
        this.arrive_datetime = "";
        this.places = [];
}

function Place() {
        this.id = 0;
        this.tourId = 0;
        this.place_id = 0;
        this.place_name = "";
        this.place_address = "";
        this.coord_x = 0;
        this.coord_y = 0;
        this.index = 0;
        this.start_datetime = "";
        this.stay_time = "00:00";
}

const colorSet = ["#5F6366", "#4D6D9A", "#86B3D1", "#99CED3", "#EDB5BF"];

// const places = new kakao.maps.services.Places();
// 매개변수 map = 주어진 map 기준으로 검색
// setMap(map); 으로도 설정 가능

saveBtn.onclick = saveSchedule;
clearBtn.onclick = clearSchedule;

window.onload = function () {
        navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

        const queryString = getQueryStringObj();
        days = queryString.days;
        scheduleId = queryString.id;
        loadTourSchedule();
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

function loadTourSchedule() {
        $.ajax({
                type: "post",
                url: "/tour/getTourSchedules",
                data: { "scheduleId": scheduleId },
                dataType: "json",
                success: function (data) {
                        originData = data;
                        if (data.length == 0) {
                                setDefaultTourData(days, scheduleId);
                        } else {
                                setDefaultTourData(days, scheduleId, data);
                        }
                        for (let i = 0; i < tourData.length; i++) {
                                addSchedulerTag(i, true);
                        }
                        addTourCardTags();
                        addChangePriorityEvent();
                        loadNavi();
                },
                error: function (xhr, status, error) {
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                }
        });
}

function setDefaultTourData(days, schedule) {
        setDefaultTourData(days, scheduleId, null);
}

function setDefaultTourData(days, scheduleId, data) {
        let scheduleData;
        if (data == null) {
                $.ajax({
                        type: "post",
                        url: "/user/getSchedule",
                        data: { "scheduleId": scheduleId },
                        dataType: "json",
                        async: false,
                        success: function (data) {
                                scheduleData = data;
                        },
                        error: function (xhr, status, error) {
                                console.log(xhr);
                                console.log(status);
                                console.log(error);
                        }
                });
        }
        for (let i = 0; i < days; i++) {
                const tour = new Tour();
                tour.scheduleId = data == null ? scheduleId : data[i].scheduleId;
                tour.title = data == null ? `${i + 1}일차` : data[i].title;
                tour.description = data == null ? `${i + 1}일차` : data[i].description;
                tour.search_priority = data == null ? "RECOMMEND" : data[i].search_priority;

                let startDate = data == null ? new Date(scheduleData.startDate) : new Date(data.start_datetime);
                let arriveDate = data == null ? new Date(scheduleData.endDate) : new Date(data.arrive_datetime);
                let year = startDate.getFullYear();
                let month = startDate.getMonth() + 1;
                let startDay = startDate.getDate() + i;
                let startTime = `${String(startDate.getHours()).padStart(2, "0")}:${String(startDate.getMinutes()).padStart(2, "0")}:00`;
                let endTime = `${String(arriveDate.getHours()).padStart(2, "0")}:${String(arriveDate.getMinutes()).padStart(2, "0")}:00`;
                endTime = i == 0 && days > 1 ? "00:00:00" :                               // 일정이 여러 날인데 첫 날인 경우
                        days > 2 && i != days - 1 ? "00:00:00" : endTime;               // 일정이 3일 이상인데 중간에 낀 날인 경우
                startTime = i == days - 1 && days > 1 ? "00:00:00" :                   // 일정이 여러 날인데 마지막 날인 경우
                        days > 2 && i != 0 ? "00:00:00" : startTime;                        // 일정이 3일 이상인데 중간에 낀 날인 경우

                const lastDay = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
                let nextDay = endTime == "00:00:00" ? startDay + 1 : startDay;
                if (startDay > lastDay) { // 해당 월 말일보다 day가 큰 경우 월++
                        month++;
                        if (month > 12) { // 월이 12를 초과한 경우 연도 증가
                                month - 12;
                                year++;
                        }
                        startDay -= lastDay;
                        nextDay = startDay + 1;
                }
                let nextMonth = month;
                let nextYear = year;
                if (nextDay > lastDay) { // 해당 월 말일보다 day가 큰 경우 월++
                        nextMonth++;
                        if (nextMonth > 12) { // 월이 12를 초과한 경우 연도 증가
                                nextMonth - 12;
                                nextYear++;
                        }
                }
                tour.start_datetime = `${year}-${String(month).padStart(2, "0")}-${String(startDay).padStart(2, "0")}T${startTime}`;
                tour.arrive_datetime = `${nextYear}-${String(nextMonth).padStart(2, "0")}-${String(nextDay).padStart(2, "0")}T${endTime}`;

                const maxIndex = data == null ? 1 : data[i].places.length;
                for (let j = 0; j < maxIndex; j++) {
                        const place = new Place();
                        if (data != null) {
                                place.id = data[i].places[j].id;
                                place.tourId = data[i].places[j].tourId;
                                place.place_id = data[i].places[j].place_id;
                                place.place_name = data[i].places[j].place_name;
                                place.place_address = data[i].places[j].place_address;
                                place.coord_x = data[i].places[j].coord_x;
                                place.coord_y = data[i].places[j].coord_y;
                                place.index = data[i].places[j].index;
                                place.stay_time = data[i].places[j].stay_time;
                        }
                        const hour = String(startDate.getHours()).padStart(2, "0");
                        const minute = String(startDate.getMinutes()).padStart(2, "0");
                        const second = String(startDate.getSeconds()).padStart(2, "0");
                        place.start_datetime = i == 0 ?
                                `${year}-${String(month).padStart(2, "0")}-${String(startDay).padStart(2, "0")}T${hour}:${minute}:${second}` :
                                `${year}-${String(month).padStart(2, "0")}-${String(startDay).padStart(2, "0")}T00:00:00`;
                        tour.places.push(place);
                }
                tourData.push(tour);
        }
}

function addTourCardTags() {
        for (let i = 0; i < days; i++) {
                const tour = tourData[i];
                const tourContainer = document.createElement("button");
                tourContainer.id = tour.id;
                tourContainer.type = "button";
                tourContainer.innerHTML = `<div class="day-title">
                                                                   <span>${tour.title}</span>
                                                                   <span> (${tour.start_datetime.substring(0, 10)}) </span>
                                                           </div>
                                                           <div class="day-tour-time">
                                                                   <span>${tour.start_datetime.substring(11, 19)} ~ ${tour.arrive_datetime.substring(11, 19)}</span>
                                                           </div>
                                                           <div class="day-priority">
                                                                   <span>${tour.search_priority}</span>
                                                           </div>`;
                dailyTourList.appendChild(tourContainer);
                tourContainer.onclick = switchScheduler;
        }
}

function addSchedulerTag(tourIndex, isInitailize) {
        const tour = tourData[tourIndex];
        const scheduler = document.createElement("div");
        scheduler.className = tourIndex == 0 ? "scheduler" : "scheduler hidden";

        const header = document.createElement("div");
        header.id = "schedule-header";
        header.innerHTML = `<span>Tour Schedule</span>`;
        scheduler.appendChild(header);

        const places = tour.places;
        for (let i = 0; i < places.length; i++) {
                const place = places[i];
                const placeContainer = document.createElement("div");
                const placeTexts = document.createElement("div");
                placeTexts.className = "place-texts";
                if (i == 0) {
                        placeContainer.id = "start-place";
                        placeTexts.innerHTML = `<span>시작 지점</span>`;
                } else if (i == places.length - 1) {
                        placeContainer.id = "end-place";
                        placeTexts.innerHTML = `<span>도착지</span>`;
                } else {
                        placeContainer.className = "middle-place";
                        placeTexts.innerHTML = `<span>경유지${place.index}</span>`;
                }
                let hour = place.start_datetime.substring(11, 13);
                let minute = place.start_datetime.substring(14, 16);
                console.log(hour);
                console.log(minute);

                placeTexts.innerHTML += `<span class="place-name">${place.place_name}</span>`;
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
                placeContainer.appendChild(placeTexts);
                placeContainer.innerHTML += `<div class="waypointBtns">
                                                                        <button class="Deletewaypoint" type="button"></button>
                                                                        <div id="${place.index}">
                                                                                <div class="upIndex">
                                                                                        <span></span>
                                                                                </div>
                                                                                <div class="downIndex">
                                                                                        <span></span>
                                                                                </div>
                                                                        </div>
                                                                </div>`;
                scheduler.appendChild(placeContainer);

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
                        stayTimeTag.onclick = showTimePicker;
                }
        }
        if (isInitailize == true) {
                aside.insertBefore(scheduler, wayToSort);
                schedulers.push(scheduler.children);
        } else {
                const nextScheduler = aside.children[tourIndex];
                aside.insertBefore(scheduler, nextScheduler);
                schedulers[tourIndex] = scheduler.children;
        }

        for (let i = 1; i < schedulers[tourIndex].length; i++) {
                schedulers[tourIndex][i].querySelector(".Deletewaypoint").onclick = i == 1 || i == schedulers[tourIndex].length - 1 ? remainPlaceFrame : deleteWayPointEvent;
                schedulers[tourIndex][i].querySelector(".upIndex").onclick = positionUpEvent;
                schedulers[tourIndex][i].querySelector(".downIndex").onclick = positionDownEvent;
                if (schedulers[tourIndex][i].id != "end-place") {
                        schedulers[tourIndex][i].querySelector(".start-time").onchange = startTimeChangeEvent;
                }
        }
}

function switchScheduler(event) {
        const target = event.target;
        let dayCards = dailyTourList.children;

        for (let i = 0; i < dayCards.length; i++) {
                if (dayCards[i] == target) {
                        schedulers[i][0].parentElement.className = "scheduler";
                } else {
                        schedulers[i][0].parentElement.className = "scheduler hidden";
                }
        }
        loadNavi();
}

function addChangePriorityEvent() {
        const sorting = wayToSort.children;
        for (let i = 1; i < sorting.length; i++) {
                sorting[i].onclick = () => {
                        const tourIndex = getCurrentSchedulerIndex();
                        tourData[tourIndex].search_priority = sorting[i].querySelector("input").id;
                        const dayCards = dailyTourList.children;
                        dayCards[tourIndex].querySelector(".day-priority > span").innerText = tourData[tourIndex].search_priority;
                        loadNavi();
                }
        }
}

function remainPlaceFrame(event) {
        console.log(event);
        const place = event.path[2];
        const tourIndex = getCurrentSchedulerIndex();
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
								 		 <input type="time" name="start-time" class="start-time" value="${dailyTourList.children[tourIndex].querySelector(".day-tour-time > span").innerText.substring(0, 5)}">
								 	 </label>
								 	 <label for="stay-time">
								 		 <span class="time-title">체류 시간 : </span>
								 		 <input type="text" name="stay-time" class="stay-time" readOnly value="00:00">
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
        place.querySelector(".Deletewaypoint").onclick = remainPlaceFrame;
        place.querySelector(".upIndex").onclick = positionUpEvent;
        place.querySelector(".downIndex").onclick = positionDownEvent;
        place.querySelector(".stay-time").onclick = showTimePicker;
}

function saveSchedule() {
        for (let i = 0; i < tourData.length; i++) {
                const tour = tourData[i];
                if (tour.places.length == 1 && tour.places[0].place_name == "") {
                        tour.places = [];
                }
        }
        console.log(tourData);
        if (originData.length == 0) {
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
        const tourIndex = getCurrentSchedulerIndex();

        tourData[tourIndex].places = [];
        const place = new Place();
        tourData[tourIndex].places.push(place);

        scheduler.remove();
        addSchedulerTag(tourIndex, false);
}

function startTimeChangeEvent(event) {
        const place = event.path[4];
        const placeIndex = place.querySelector(".waypointBtns > div").id;
        const tourIndex = getCurrentSchedulerIndex();
        tourData[tourIndex].places[placeIndex].start_datetime = `${tourData[tourIndex].places[placeIndex].start_datetime.substring(0, 11)}${place.querySelector(".start-time").value}`;
        if (place.id == "start-place") {
                const dayTourTime = days[tourIndex].querySelector(".day-tour-time > span");
                const endTime = dayTourTime.innerText.substring(8, dayTourTime.innerText.length);
                dayTourTime.innerText = `${startTime.value}:00${endTime}`;
                loadNavi(scheduler);
        }
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
                                url: `https://dapi.kakao.com/v2/local/search/keyword.json?query=${placeName == null ? address : placeName}&x=${latLng.getLng()}&y=${latLng.getLat()}&sort=accuracy`,
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

        const tourIndex = getCurrentSchedulerIndex();

        for (let i = 0; i < btns.length; i++) {
                btns[i].onclick = () => {
                        const placeFlag = i == 0 ? "start-place" :
                                i == btns.length - 1 ? "end-place" : "waypoint";
                        if (placeFlag == "waypoint" && tourData[tourIndex].places.length < 2) return;
                        containPlace(place, documents, placeFlag);
                        getCurrentScheduler().remove();
                        addSchedulerTag(tourIndex, false);
                        console.log(tourData);
                        loadNavi();
                }
        }
}

function containPlace(place, documents, placeFlag) {
        console.log(place);
        const tourIndex = getCurrentSchedulerIndex();
        const placeIndex = placeFlag == "start-place" ? 0 :
                placeFlag == "end-place" ? tourData[tourIndex].places.length : tourData[tourIndex].places.length - 1;
        const newPlace = new Place();
        newPlace.place_id = place == null ? documents[0].place_id : place.id;
        newPlace.place_name = place == null ? documents[0].place_name : place.place_name;
        newPlace.place_address = place == null ? documents[0].place_address : place.road_address_name == null ? place.address_name : place.road_address_name;
        newPlace.coord_x = place == null ? documents[0].coord_x : place.x;
        newPlace.coord_y = place == null ? documents[0].coord_y : place.y;
        newPlace.index = placeIndex;
        if (placeIndex == 0) {
                newPlace.start_datetime = tourData[tourIndex].start_datetime;
                console.log(newPlace.start_datetime);
        } else {
                const beforePlace = tourData[tourIndex].places[placeIndex - 1];
                const start_datetime = beforePlace.start_datetime;
                const stay_time = beforePlace.stay_time;
                const hour = start_datetime.substring(11, 13) * 1 + stay_time.substring(0, 2) * 1;
                const minute = start_datetime.substring(14, 16) * 1 + stay_time.substring(3, 5) * 1;
                newPlace.start_datetime = `${start_datetime.substring(0, 11)}${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;
        }
        if (placeIndex == 0) {
                tourData[tourIndex].places[placeIndex] = newPlace;
        } else if (placeIndex == tourData[tourIndex].places.length) {
                tourData[tourIndex].places.push(newPlace);
        } else {
                tourData[tourIndex].places[placeIndex].index = placeIndex + 1;
                tourData[tourIndex].places.splice(placeIndex, 0, newPlace);
        }
}

function deleteWayPointEvent(event) {
        console.log(event);
        const place = event.path[2];
        const placeIndex = event.target.nextElementSibling.id;
        let tourIndex = getCurrentSchedulerIndex();
        deleteBtn.onclick = () => {
                if (place.id == "") {
                        tourData[tourIndex].places.splice(placeIndex, 1);
                }
                removeTakenTimeTags();
                place.remove();
                replacePlaceIndex();

                loadNavi();
        }
}

function positionUpEvent(event) {
        console.log(event);
        const place = event.path[3];
        if (place.id != "start-place") {
                const scheduler = getCurrentScheduler();
                const tourIndex = getCurrentSchedulerIndex();
                const placeIndex = place.querySelector(".waypointBtns > div").id * 1;

                const beforeElement = place.previousElementSibling;
                if (beforeElement == null) return;

                tourData[tourIndex].places[placeIndex].index = placeIndex - 1;
                tourData[tourIndex].places[placeIndex - 1].index = placeIndex;
                tourData[tourIndex].places.sort((a, b) => a.index - b.index);

                scheduler.remove();
                addSchedulerTag(tourIndex, false);

                loadNavi();
        }
}

function positionDownEvent(event) {
        console.log(event);
        const place = event.path[3];
        if (place.id != "end-place") {
                const scheduler = getCurrentScheduler();
                const tourIndex = getCurrentSchedulerIndex();
                const placeIndex = place.querySelector(".waypointBtns > div").id * 1;
                console.log(placeIndex);

                const nextElement = place.nextElementSibling;
                if (nextElement == null) return;

                tourData[tourIndex].places[placeIndex].index = placeIndex + 1;
                tourData[tourIndex].places[placeIndex + 1].index = placeIndex;
                tourData[tourIndex].places.sort((a, b) => a.index - b.index);

                scheduler.remove();
                addSchedulerTag(tourIndex, false);

                loadNavi();
        }
}

function replacePlaceIndex() {
        const tourIndex = getCurrentSchedulerIndex();
        const places = tourData[tourIndex].places
        for (let i = 0; i < places; i++) {
                places[i].index = i;
        }
}

function searchKeyword() {
        searchedPlaces.textContent = "";
        const keyword = searcher.value;
        const documents = [];
        let page = 1;
        let is_end = false;
        for (let i = 0; i < 3; i++) {
                /* ajax는 기본적으로 비동기 방식이다. (async == true)
                   반복문에서 변수의 증감을 이용한 요청을 하기 위해서는 ajax를 명시적으로 동기로 바꾸어줄 필요가 있다 (async -> false) */
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

function loadNavi() {
        const tourIndex = getCurrentSchedulerIndex();
        const tour = tourData[tourIndex];
        const places = tour.places;
        if (places.length < 2) return;

        erasePolyline();
        eraseMarkers();

        const lastPlaceIndex = places.length - 1;
        const startPlaceName = places[0].place_name;
        const endPlaceName = places[lastPlaceIndex].place_name;
        let placeNames = [startPlaceName];

        const origin = {
                "x": places[0].coord_x,
                "y": places[0].coord_y
        }
        const destination = {
                "x": places[lastPlaceIndex].coord_x,
                "y": places[lastPlaceIndex].coord_y
        }
        const wayPoints = [];

        if (places.length > 2) {
                for (let i = 0; i < places.length - 2; i++) {
                        const wayPoint = {
                                "name": places[i + 1].place_name,
                                "x": places[i + 1].coord_x,
                                "y": places[i + 1].coord_y
                        }
                        wayPoints.push(wayPoint);
                        placeNames.push(places[i].place_name);
                }
        }
        placeNames.push(endPlaceName);

        data = wayPoints.length == 0 ? {
                "origin": origin,
                "destination": destination,
                "priority": tour.search_priority,
                "alternatives": true
        } : {
                "origin": origin,
                "destination": destination,
                "waypoints": wayPoints,
                "priority": tour.search_priority,
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
