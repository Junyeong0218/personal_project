const mapContainer = document.querySelector("#maps");
const searcher = document.querySelector("#searcher");
const searchedPlaces = document.querySelector("#searched-places");
/*const searchBtn = document.querySelector("#search-btn");*/

let lat = 0;
let lon = 0;

let options;
let map;
let marker;
let geocoder;
let customOverlay;
let wayPointCnt = 1;

// const places = new kakao.maps.services.Places();
// 매개변수 map = 주어진 map 기준으로 검색
// setMap(map); 으로도 설정 가능

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
	
	kakao.maps.event.addListener(map, "click", function(mouseEvent) {
		const latLng = mouseEvent.latLng;

		moveCenter(latLng);
		
		showPlaceInfo(latLng);
		
	});
}

function onGeoError() {
    alert("Can't find you. No map for you.");
}

function moveCenter(latLng) {
	marker.setPosition(latLng);
	map.panTo(latLng, 100);
}

function showPlaceInfo(latLng) {
	const callback = function(result, status) {
		if(status === kakao.maps.services.Status.OK) {
			if(customOverlay != null) {
				customOverlay.setMap(null);
			}
			
			console.log(result);
			let address;
			if(result[0].road_address != null) {
				address = result[0].road_address.address_name;
			} else {
				address = result[0].address.address_name;
			}
			
			$.ajax({
		   		type: "get",
		    	url: `https://dapi.kakao.com/v2/local/search/keyword.json?y=${latLng.getLat()}&x=${latLng.getLng()}&sort=distance&query=${address}`,
		    	headers: { "Authorization": "KakaoAK abd8abba6430208eec39d8f882753415" },
		    	success: function (data) {
					const documents = data.documents;
					let contents = `<div class="placeOverlay">
							   		<div class="overlay-title">
							   			<span class="overlay-placename">${documents[0].place_name}</span>
							   			<span class="overlay-address">${address}</span>
							   		</div>
							   		<div class="overlay-details">
							   			<div class="overlay-detail">
							   			</div>
							   			<div class="overlay-btns">
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
					
					let btns = document.querySelectorAll(".overlay-btns")[0].children;
					console.log(btns);
					btns[0].addEventListener("click", function(event) {
						event.preventDefault();
						const scheduler = document.querySelector("#scheduler");
						const tags = document.createElement("div");
						tags.className = "middle-place";
						tags.innerHTML = `<div class="place-texts">
											  <span>경유지${wayPointCnt++}</span>
											  <span class="place-name">${documents[0].place_name}</span>
										  </div>
										  <div class="waypointBtns">
										  	<button class="Addwaypoint" type="button"></button>
										  	<button class="Deletewaypoint" type="button"></button>
										  </div>`;
						scheduler.appendChild(tags);
					});
					btns[1].addEventListener("click", function(event) {
						event.preventDefault();
						const scheduler = document.querySelector("#scheduler");
						const tags = document.createElement("div");
						tags.id = "end-place";
						tags.innerHTML = `<div class="place-texts">
											  <span>도착지</span>
											  <span class="place-name">${documents[0].place_name}</span>
										  </div>
										  <div class="waypointBtns">
										  	<button class="Addwaypoint" type="button"></button>
										  	<button class="Deletewaypoint" type="button"></button>
										  </div>`;
						scheduler.appendChild(tags);
					});
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

function searchKeyword() {
	searchedPlaces.textContent = "";
	const keyword = searcher.value;
	const latLng = map.getCenter();
	
	console.log(keyword);
	
	$.ajax({
   		type: "get",
    	url: `https://dapi.kakao.com/v2/local/search/keyword.json?y=${latLng.getLat()}&x=${latLng.getLng()}&sort=distance&query=${keyword}`,
    	headers: { "Authorization": "KakaoAK abd8abba6430208eec39d8f882753415" },
    	success: function (data) {
			const documents = data.documents;
			console.log(data.documents);
			
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
					geocoder.addressSearch(documents[i].address_name ,AddrToCoords);
				});
				li.addEventListener("click", function() {
					const AddrToCoords = function(result, status) {
						if(status === kakao.maps.services.Status.OK) {
							searchedPlaces.textContent = "";
							
							showPlaceInfo(new kakao.maps.LatLng(result[0].y, result[0].x));
						}
					}
					geocoder.addressSearch(documents[i].address_name ,AddrToCoords);
				});
				searchedPlaces.appendChild(li);
			}
		},
		error: function (xhr, status, error) {
			console.log(xhr);
			console.log(status);
			console.log(error);
		}
	});
};

