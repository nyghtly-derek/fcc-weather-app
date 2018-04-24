const addressDisplay = document.getElementById("js-location");
const tempDisplay = document.getElementById("js-temp");
const tempTypeDisplay = document.getElementById("js-temptype");
const conditionsDisplay = document.getElementById("js-conditions");

let lat = -1;
let long = -1;
let tempType = "f";
let tempCel = 0;
let tempFahren = 0;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(useLocation, geoError);
    } else {
        addressDisplay.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function useLocation(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    reverseGeocode(lat, long);
    const fccApiRequest = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long;
    httpGet(fccApiRequest, getWeather);
}

function reverseGeocode(lat, long) {
    const latlng = new google.maps.LatLng(lat, long);
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, displayLocation);
}

function displayLocation(results, status) {
    if (status !== google.maps.GeocoderStatus.OK) { 
        addressDisplay.innerHTML = "location not found";
    } 
    else {
        const userAddress = results[3].formatted_address;
        console.log(userAddress);
        addressDisplay.innerHTML = userAddress;
    }
}

function getWeather(weatherJson) {
    tempCel = weatherJson.main.temp;
    tempFahren = toFahrenheit(tempCel);
    let conditions = weatherJson.weather[0].main;
    displayTemp(tempType);
    displayConditions(conditions);
}

function displayTemp(tempType) {
    if (tempType == "c") {
        tempDisplay.innerHTML = tempCel;
        tempTypeDisplay.innerHTML = "C";
    }
    else if (tempType == "f") {
        tempDisplay.innerHTML = tempFahren;
        tempTypeDisplay.innerHTML = "F";
    }
}

function toFahrenheit(tempC) {
    tempF = tempCel * (9/5) + 32;
    return tempF;
}

function displayConditions(conditions) {
    conditionsDisplay.innerHTML = conditions;
}

function geoError() {
    addressDisplay.innerHTML = "Error: user position not found.";
}

function switchTempType() {
    if (tempType == "c") {
        tempType = "f";
    }
    else if (tempType == "f") {
        tempType = "c";
    }
    displayTemp(tempType);
}

/** httpGet function borrowed from stack overflow user Joan and modified (commented for educational benefit) **/

function httpGet(url, callback)
{
    var xmlHttp = new XMLHttpRequest(); // xmlhttprequest is an object that handles http requests
    xmlHttp.onreadystatechange = function() { // called when the readystate property of the xmlhttprequest object changes
        console.log(xmlHttp.readyState);
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) // readystate is a property of xmlhttp that changes as loading happens
            // readystate 4 means that the loading is DONE
            // the status property is based on standardized HTTP response status codes (ex: 404 "not found"; 200 "OK")
            callback(xmlHttp.response); 
    }
    xmlHttp.open("GET", url, true); // true for asynchronous; initializes request
    xmlHttp.responseType = "json"; // default response type would have been text
    xmlHttp.send(null); // sends request to server
}
