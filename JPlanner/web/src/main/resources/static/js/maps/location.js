const API_KEY = "e5a0012b9d92ab1a99fc526d31b8cb3d";


navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

function onGeoOk(position) {
    let lat = position.coords.latitude; // 위도
    let lon = position.coords.longitude; // 경도
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url);
}

function onGeoError() {
    alert("Can't find you. No weather for you.");
}

// navigator.geolocation.getCurrentPosition(<function1>, <function2>);
// You can get information about User's Wifi, location, GPS etc..
// function1 will be execute when the getCurrentPosition() is successed
// with an argument : Object GeolocationPosition.
// function2 will be execute when the getCurrentPosition() is failed.
// API can help you to access other server.

// openweathermap.org
// id : hippo2003
// pw : wns12358
// API Key : e5a0012b9d92ab1a99fc526d31b8cb3d

// fetch(<url>)
// Web browser will call <url> instead you.