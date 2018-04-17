const addressDisplay = document.getElementById("js-location");
const tempDisplay = document.getElementById("js-temp");
const tempTypeDisplay = document.getElementById("js-temptype");

let lat = -1;
let long = -1;
let tempType = "celsius";

/** get weather data from fcc api **/

async function getWeather() {
    await getLocation(); 
    const requestURL = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long;
    httpGet(requestURL, getTemp);
}

function getTemp(weatherJson) {
    let temp = weatherJson.main.temp;
    if (tempType == "celsius") {
        tempDisplay.innerHTML = temp;
    }
}

/** find user location using google maps api **/

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(reverseGeocode, geoError);
    } else {
        addressDisplay.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function reverseGeocode(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    const latlng = new google.maps.LatLng(lat, long);
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status !== google.maps.GeocoderStatus.OK) { 
            addressDisplay.innerHTML = "location not found";
        }
        else {
            const userAddress = results[3].formatted_address;
            console.log(userAddress);
            addressDisplay.innerHTML = 
                userAddress;
        }
    });
}

function geoError() {
    addressDisplay.innerHTML = "Error: user position not found.";
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
