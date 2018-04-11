const addressDisplay = document.getElementById("js-location");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(reverseGeocode, geoError);
    } else {
        addressDisplay.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function reverseGeocode(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const latlng = new google.maps.LatLng(lat, long);
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status !== google.maps.GeocoderStatus.OK) { 
            addressDisplay.innerHTML = 
                userAddress;
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






