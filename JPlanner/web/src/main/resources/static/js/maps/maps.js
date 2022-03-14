const mapContainer = document.querySelector("#maps");
const searcher = document.querySelector("#searcher");
const searchedPlaces = document.querySelector("#searched-places");
const startPlace = document.querySelector("#start-place");

let lat = 0;
let lon = 0;

let options;
let map;
let marker;
let geocoder;
let customOverlay;
let wayPointCnt = 1;

const colorSet = ["#5F6366", "#4D6D9A", "#86B3D1", "#99CED3", "#EDB5BF"];

// const places = new kakao.maps.services.Places();
// 매개변수 map = 주어진 map 기준으로 검색
// setMap(map); 으로도 설정 가능

startPlace.querySelector(".Deletewaypoint").addEventListener("click", function() {
	const span = document.createElement("span");
	span.innerText = "시작 지점";
	const placeName = document.createElement("span");
	placeName.className = "place-name";
	
	const placeTexts = startPlace.querySelector(".place-texts");
	placeTexts.textContent = "";
	placeTexts.appendChild(span);
	placeTexts.appendChild(placeName);
});

window.onload = function() {
	navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
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
			   					<span>도착지로 추가</span>
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
	
	setOverlayEvent(place, documents);
}

function setOverlayEvent(place, documents) {
	const overlayCloser = document.querySelector("#overlay-closer");
	overlayCloser.addEventListener("click", function() {
		customOverlay.setMap(null);
	});
	
	let btns = document.querySelectorAll(".overlay-btns")[0].children;
	
	btns[0].addEventListener("click", function(event) {
		event.preventDefault();
		startPlace.querySelector(".place-name").innerText = place == null ? documents[0].place_name : place.place_name;
		
		const placeTexts = startPlace.querySelector(".place-texts");
		
		let span = document.createElement("span");
		span.className = "hidden";
		span.innerText = place == null ? documents[0].x : place.x;
		placeTexts.appendChild(span);
		
		span = document.createElement("span");
		span.className = "hidden";
		span.innerText = place == null ? documents[0].y : place.y;
		placeTexts.appendChild(span);
		loadNavi();
	});
	
	btns[1].addEventListener("click", function(event) {
		event.preventDefault();
		const scheduler = document.querySelector("#scheduler");
		const tags = document.createElement("div");
		tags.className = "middle-place";
		tags.innerHTML = `<div class="place-texts">
							  <span>경유지${wayPointCnt++}</span>
							  <span class="place-name">${place == null ? documents[0].place_name : place.place_name}</span>
							  <span class="hidden">${place == null ? documents[0].x : place.x}</span>
							  <span class="hidden">${place == null ? documents[0].y : place.y}</span>
						  </div>
						  <div class="waypointBtns">
						  	<button class="Addwaypoint" type="button"></button>
						  	<button class="Deletewaypoint" type="button"></button>
						  </div>`;
		scheduler.appendChild(tags);
		
		loadNavi();
	});
	
	btns[2].addEventListener("click", function(event) {
		event.preventDefault();
		const scheduler = document.querySelector("#scheduler");
		const tags = document.createElement("div");
		tags.id = "end-place";
		tags.innerHTML = `<div class="place-texts">
							  <span>도착지</span>
							  <span class="place-name">${place == null ? documents[0].place_name : place.place_name}</span>
							  <span class="hidden">${place == null ? documents[0].x : place.x}</span>
							  <span class="hidden">${place == null ? documents[0].y : place.y}</span>
						  </div>
						  <div class="waypointBtns">
						  	<button class="Deletewaypoint" type="button"></button>
						  </div>`;
		scheduler.appendChild(tags);
		loadNavi();
	});
}

function searchKeyword() {
	searchedPlaces.textContent = "";
	const keyword = searcher.value;
	const latLng = map.getCenter();
	
	$.ajax({
   		type: "get",
    	url: `https://dapi.kakao.com/v2/local/search/keyword.json?y=${latLng.getLat()}&x=${latLng.getLng()}&sort=accuracy&query=${keyword}`,
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
		li.addEventListener("mouseover", function() {
			const AddrToCoords = function(result, status) {
				if(status === kakao.maps.services.Status.OK) {
					moveCenter(new kakao.maps.LatLng(result[0].y, result[0].x));
				}
			}
			geocoder.addressSearch(documents[i].address_name, AddrToCoords);
		});
		li.addEventListener("click", function() {
			const AddrToCoords = function(result, status) {
				if(status === kakao.maps.services.Status.OK) {
					showPlaceInfo(new kakao.maps.LatLng(result[0].y, result[0].x), documents[i].place_name);
					
					searchedPlaces.textContent = "";
				}
			}
			geocoder.addressSearch(documents[i].address_name, AddrToCoords);
		});
		searchedPlaces.appendChild(li);
	}
}

function loadNavi() {
	const endPlace = document.querySelector("#end-place");
	const middlePlaces = document.querySelectorAll(".middle-place");
	
	if(startPlace == null || endPlace == null || middlePlaces == null) {
		return;
	}
	
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
	
	const url = "https://apis-navi.kakaomobility.com/v1/waypoints/directions";
	
	$.ajax({
   		type: "post",
    	url: url,
    	headers: { "Authorization": "KakaoAK abd8abba6430208eec39d8f882753415",
    			   "Content-Type": "application/json; charset=UTF-8"},
    	data: JSON.stringify({ "origin": origin,
			"destination": destination,
			"waypoints": wayPoints,
			"priority": "RECOMMEND",
			"car_type": 1,
			"car_fuel": "GASOLINE"
	    }),
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
		} else {
			const bound = e.bound;
			if(bound.min_x < min_x) min_x = bound.min_x;
			if(bound.min_y < min_y) min_y = bound.min_y;
			if(bound.max_x > max_x) max_x = bound.max_x;
			if(bound.max_y > max_y) max_y = bound.max_y;
		}
		
		/*const firstGuide = e.guides[0];*/
		const startPosition = new kakao.maps.LatLng(e.guides[0].y, e.guides[0].x);
		const startMarker = new kakao.maps.Marker({
			map: map,
			position: startPosition
		});
		startMarker.setMap(map);

		const startMarkerIndex = i;
		kakao.maps.event.addListener(startMarker, "click", function() {
			showPlaceInfo(startPosition, placeNames[startMarkerIndex]);
		});
		i++;
		
		if(sections[sections.length-1] == e) {
			const endPosition = new kakao.maps.LatLng(e.guides[e.guides.length-1].y, e.guides[e.guides.length-1].x);
			const endMarker = new kakao.maps.Marker({
				map: map,
				position: endPosition
			});
			endMarker.setMap(map);
			const endMarkerIndex = i;
			kakao.maps.event.addListener(endMarker, "click", function() {
				showPlaceInfo(endPosition, placeNames[endMarkerIndex]);
			});
		}
		/*const colorIndex = Math.floor(Math.random() * 5);
		console.log(colorIndex);
		console.log(colorSet[colorIndex]);*/
		/* 원색 (주황색, 살색, 초록색 제외)*/
		
		e.roads.forEach(ie =>{
			let paths = [];
			const vertexes = ie.vertexes;
			
			for(let i=0; i<vertexes.length; i++) {
				paths.push(new kakao.maps.LatLng(vertexes[i+1], vertexes[i++]));
			}
			
			const polyline = new kakao.maps.Polyline({
				map: map,
				path: paths,
				strokeWeight: 5,
				strokeColor: "#0000ff",
				strokeOpacity: 0.8
			});
			
			polyline.setMap(map);
		}); // end road forEach
		
	}); // end section forEach
	
	const bounds = new kakao.maps.LatLngBounds();
	bounds.extend(new kakao.maps.LatLng(min_y, min_x));
	bounds.extend(new kakao.maps.LatLng(max_y, max_x));
	
	map.setBounds(bounds);
	// setBounds minToMax
	
} // end function



