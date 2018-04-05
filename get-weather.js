
var locationDisplay = document.getElementById("js-location");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, geoError);
    } else {
        locationDisplay.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    locationDisplay.innerHTML = 
        "<br>Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude; 
}

function geoError() {
    locationDisplay.innerHTML = "Error: user position not found.";
}
