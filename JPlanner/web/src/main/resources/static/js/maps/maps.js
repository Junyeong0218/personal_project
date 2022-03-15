const mapContainer = document.querySelector("#maps");
const searcher = document.querySelector("#searcher");
const searchedPlaces = document.querySelector("#searched-places");
const scheduler = document.querySelector("#scheduler");
const startPlace = document.querySelector("#start-place");
let priority = document.querySelector(".wayToSort input[checked]").id;

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
let placeIndex = 0;
let wayPointCnt = 1;

const colorSet = ["#5F6366", "#4D6D9A", "#86B3D1", "#99CED3", "#EDB5BF"];

// const places = new kakao.maps.services.Places();
// 매개변수 map = 주어진 map 기준으로 검색
// setMap(map); 으로도 설정 가능

function remainPlaceFrame(place) {
	const span = document.createElement("span");
	span.innerText = place.id == "start-place" ? "시작 지점" :
					 place.id == "end-place" ? "도착지" : "";
	const placeName = document.createElement("span");
	placeName.className = "place-name";
	
	const placeTexts = place.querySelector(".place-texts");
	placeTexts.textContent = "";
	placeTexts.appendChild(span);
	placeTexts.appendChild(placeName);
	
	AddChangePositionEvent(place);
}

window.onload = function() {
	navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
	let startPlace = document.createElement("div");
	startPlace.id = "start-place";
	startPlace.innerHTML = `<div class="place-texts">
								<span>시작 지점</span>
								<span id="" class="place-name"></span>
							</div>
							<div class="waypointBtns">
								<button class="Deletewaypoint" type="button"></button>
								<div id="${placeIndex++}">
									<div class="upIndex">
										<span></span>
									</div>
									<div class="downIndex">
										<span></span>
									</div>
								</div>
							</div>`
	scheduler.appendChild(startPlace);
	startPlace.querySelector(".Deletewaypoint").addEventListener("click", function() {
		remainPlaceFrame(startPlace);
	});
	const sorting = document.querySelector(".wayToSort").children;
	for(let i=1; i<sorting.length; i++) {
		sorting[i].addEventListener("click", function() {
			priority = sorting[i].querySelector("input").id;
			loadNavi();
		});
	}
};

function onGeoOk(position) {
    lat = position.coords.latitude; // 위도
    lon = position.coords.longitude; // 경도
    
    options = {
		center : new kakao.maps.LatLng(lat, lon),
		level : 2
	};
	
	map = new kakao.maps.Map(mapContainer, options); // 현재 위치 중심의 Map 출력
	// zoomControl 추가
	map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
	
	marker = new kakao.maps.Marker({
		map : map,
		position : new kakao.maps.LatLng(lat,lon)
	}); // 현재 위치에 Marker 찍기
	
	geocoder = new kakao.maps.services.Geocoder(); // 주소, 위경도간 변환
	
	/*kakao.maps.event.addListener(map, "click", function(mouseEvent) {
		const latLng = mouseEvent.latLng;

		moveCenter(latLng);
		
		showPlaceInfo(latLng);
		
	});*/
}

function onGeoError() {
    alert("Can't find you. No map for you.");
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
	const callback = function(result, status) {
		if(status === kakao.maps.services.Status.OK) {
			if(customOverlay != null) {
				customOverlay.setMap(null);
			}
			
			let address;
			if(result[0].road_address != null) {
				address = result[0].road_address.address_name;
			} else {
				address = result[0].address.address_name;
			}

			$.ajax({
		   		type: "get",
		    	url: `https://dapi.kakao.com/v2/local/search/keyword.json?y=${latLng.getLat()}&x=${latLng.getLng()}&sort=accuracy&query=${placeName == null ? address : placeName}`,
		    	headers: { "Authorization": "KakaoAK abd8abba6430208eec39d8f882753415" },
		    	success: function (data) {
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
	if(placeName != null) {
		for(let i=0; i<documents.length; i++) {
			if(documents[i].place_name == placeName){
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
	overlayCloser.addEventListener("click", function() {
		customOverlay.setMap(null);
	});
	
	const startPlace = document.querySelector("#start-place");
	
	let btns = document.querySelectorAll(".overlay-btns")[0].children;
	
	btns[0].addEventListener("click", function(event) {
		event.preventDefault();
		const placeNameTag = startPlace.querySelector(".place-name");
		placeNameTag.innerText = place == null ? documents[0].place_name : place.place_name;
		placeNameTag.id = place == null ? documents[0].id : place.id;
		
		addAdressTag(startPlace, address);
		addPlaceCoordTag(startPlace, documents, place);
		AddChangePositionEvent(startPlace);
		
		loadNavi();
	});
	
	btns[1].addEventListener("click", function(event) {
		event.preventDefault();
		const endPlace = scheduler.querySelector("#end-place");
		let waypoint = document.createElement("div");
		waypoint.className = "middle-place";
		waypoint.innerHTML = `<div class="place-texts">
								  <span>경유지${wayPointCnt++}</span>
								  <span id="${place == null ? documents[0].id : place.id}" class="place-name">
								  		${place == null ? documents[0].place_name : place.place_name}
								  </span>
							  </div>
							  <div class="waypointBtns">
								  <button class="Deletewaypoint" type="button"></button>
								  <div id="${placeIndex++}">
									  <div class="upIndex">
										  <span></span>
									  </div>
									  <div class="downIndex">
										  <span></span>
									  </div>
								  </div>
							  </div>`;
		if(endPlace != null) {
			scheduler.insertBefore(waypoint, endPlace);
		} else {
			scheduler.appendChild(waypoint);
		}
		
		addAdressTag(waypoint, address);
		addPlaceCoordTag(waypoint, documents, place);
		AddDeleteWayPointEvent(waypoint);
		AddChangePositionEvent(waypoint);
		
		loadNavi();
		
		//<button class="Addwaypoint" type="button"></button>
	});
	
	btns[2].addEventListener("click", function(event) {
		event.preventDefault();
		let endPlace = scheduler.querySelector("#end-place");
		if(endPlace != null) {
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
							  </div>
							  <div class="waypointBtns">
							  	  <button class="Deletewaypoint" type="button"></button>
							  	  <div id="${placeIndex++}">
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
		AddDeleteWayPointEvent(endPlace);
		AddChangePositionEvent(endPlace);
		
		loadNavi();
	});
}

function addAdressTag(eachPlace, address) {
	const placeTexts = eachPlace.querySelector(".place-texts");
	
	const span = document.createElement("span");
	span.id = "address";
	span.className = "hidden";
	span.innerText = address;
	
	placeTexts.appendChild(span);
}

function addPlaceCoordTag(eachPlace, documents, place) {
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

function AddDeleteWayPointEvent(eachPlace) {
	const deleteBtn = eachPlace.querySelector(".Deletewaypoint");
	deleteBtn.addEventListener("click", function() {
		if(eachPlace.id == "") {
			placeIndex--;
		}
		eachPlace.remove();
		adjustWayPointCnt();
		loadNavi();
	});
}

function AddChangePositionEvent(eachPlace) {
	const upBtn = eachPlace.querySelector(".upIndex");
	const downBtn = eachPlace.querySelector(".downIndex");
	
	upBtn.addEventListener("click", function() {
		if(eachPlace.id != "start-place") {
			const beforeElement = eachPlace.previousElementSibling;
			
			scheduler.insertBefore(eachPlace, beforeElement);
			renameIdAndClass();
			loadNavi();
		}
	});
	
	downBtn.addEventListener("click", function() {
		if(eachPlace.id != "end-place") {
			const nextElement = eachPlace.nextElementSibling;
			
			scheduler.insertBefore(nextElement, eachPlace);
				
			renameIdAndClass();
			loadNavi();
		}
	});
}

function renameIdAndClass() {
	placeIndex = 0;
	wayPointCnt = 1;
	const children = scheduler.children;

	for(let i=1; i<children.length; i++) {
		const child = children[i];
		if(i == 1) {
			child.id = "start-place";
			child.className = "";
			child.querySelector(".place-texts > span").innerText = "시작 지점";
			child.querySelector(".waypointBtns > div").id = placeIndex++;
		} else if(i == children.length-1) {
			child.id = "end-place";
			child.className = "";
			child.querySelector(".place-texts > span").innerText = "도착지";
			child.querySelector(".waypointBtns > div").id = placeIndex++;
		} else {
			child.id = "";
			child.className = "middle-place";
			child.querySelector(".place-texts > span").innerText = `경유지${wayPointCnt++}`;
			child.querySelector(".waypointBtns > div").id = placeIndex++;
		}
	}
}

function adjustWayPointCnt() {
	const wayPoints = document.querySelectorAll(".middle-place");
	let index = 0;
	for(let i=0; i<wayPoints.length; i++) {
		const titleTag = wayPoints[i].querySelector(".place-texts").firstChild.nextSibling;
		const number = titleTag.innerText.substring(3, titleTag.innerText.length);
		
		if(number == `${i+1}`) {
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
	// const latLng = map.getCenter();
	// y=${latLng.getLat()}&x=${latLng.getLng()}&
	$.ajax({
   		type: "get",
    	url: `https://dapi.kakao.com/v2/local/search/keyword.json?sort=accuracy&query=${keyword}`,
    	headers: { "Authorization": "KakaoAK abd8abba6430208eec39d8f882753415" },
    	success: function (data) {
			const documents = data.documents;
			
			addSearchResult(documents);
		},
		error: function (xhr, status, error) {
			console.log(xhr);
			console.log(status);
			console.log(error);
		}
	});
}

function addSearchResult(documents) {
	for(let i=0; i<documents.length; i++) {
		const li = document.createElement("li");
		li.id = documents[i].id;
		li.className = "searched-place";
		li.innerHTML = `<div>
							<a href="${documents[i].place_url}" target="_blank">${documents[i].place_name}</a>
							<span>${documents[i].address_name}</span>
						</div>`;
						
		const latLng = new kakao.maps.LatLng(documents[i].y, documents[i].x);
						
		li.addEventListener("mouseover", function() {
			moveCenter(latLng);
		});
		li.addEventListener("click", function() {
			showPlaceInfo(latLng, documents[i].place_name);
			
			searchedPlaces.textContent = "";
		});
		searchedPlaces.appendChild(li);
	}
}

function loadNavi() {
	const startPlace = document.querySelector("#start-place");
	const endPlace = document.querySelector("#end-place");
	const middlePlaces = document.querySelectorAll(".middle-place");
	
	if(startPlace == null || endPlace == null || middlePlaces == null) {
		return;
	}
	
	erasePolyline();
	eraseMarkers();
	
	const startPlaceName = startPlace.querySelector(".place-name").innerText;
	const endPlaceName = endPlace.querySelector(".place-name").innerText;
	let placeNames = [startPlaceName];
	
	const origin = {"x": startPlace.querySelectorAll(".hidden")[0].innerText,
					"y": startPlace.querySelectorAll(".hidden")[1].innerText }
	const destination = {"x": endPlace.querySelectorAll(".hidden")[0].innerText,
						 "y": endPlace.querySelectorAll(".hidden")[1].innerText }
	const wayPoints = [];
	
	middlePlaces.forEach(e => {
		const wayPoint = {
			"name": e.querySelector(".place-name").innerText,
			"x": e.querySelectorAll(".hidden")[0].innerText,
			"y": e.querySelectorAll(".hidden")[1].innerText
		}
		placeNames.push(e.querySelector(".place-name").innerText);
		wayPoints.push(wayPoint);
	});
	placeNames.push(endPlaceName);
	
	data = wayPoints.length == 0 ? {
		"origin": origin,
		"destination": destination,
		"priority": priority,
		"car_type": 1,
		"car_fuel": "GASOLINE"
	} : {
		"origin": origin,
		"destination": destination,
		"waypoints": wayPoints,
		"priority": priority,
		"car_type": 1,
		"car_fuel": "GASOLINE"
	};
	
	const url = "https://apis-navi.kakaomobility.com/v1/waypoints/directions";
	
	$.ajax({
   		type: "post",
    	url: url,
    	headers: { "Authorization": "KakaoAK abd8abba6430208eec39d8f882753415",
    			   "Content-Type": "application/json; charset=UTF-8"},
    	data: JSON.stringify(data),
    	success: function (data) {
			marker.setMap(null);
			customOverlay.setMap(null);
			
			const sections = data.routes[0].sections;
			
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
	let i=0;
	sections.forEach(e => {
		if(sections[0] == e) {
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
		
		if(sections[sections.length-1] == e) {
			const endPosition = new kakao.maps.LatLng(e.guides[e.guides.length-1].y, e.guides[e.guides.length-1].x);
			const endMarkerIndex = i;
			
			addMarkers(endPosition, placeNames[endMarkerIndex]);
		}
		
		e.roads.forEach(ie =>{
			const vertexes = ie.vertexes;
			
			for(let i=0; i<vertexes.length; i++) {
				paths.push(new kakao.maps.LatLng(vertexes[i+1], vertexes[i]));
				if(vertexes[i] < min_x) min_x = vertexes[i];
				if(vertexes[i] > max_x) max_x = vertexes[i];
				if(vertexes[i+1] < min_y) min_y = vertexes[i+1];
				if(vertexes[i+1] > max_y) max_y = vertexes[i+1];
				i++;
			}
		}); // end road forEach
		
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
	
	kakao.maps.event.addListener(marker, "click", function() {
		showPlaceInfo(latLng, placeName);
	});
	
	markers.push(marker);
}

function eraseMarkers() {
	if(markers != null) {
		markers.forEach(e => {
			e.setMap(null);
		});
		markers = [];
	}
}

function erasePolyline() {
	if(polyline != null) {
		polyline.setMap(null);
		poltline = null;
		paths = [];
	}
}
