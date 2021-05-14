// API code has been adapted from examples given in the Google Maps API documentation.
// https://developers.google.com/maps/documentation/javascript/

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let map, infoWindow;

function initMap() {
    // Display the map
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 49.2827, lng: -123.1207 },
        zoom: 12,
    });
    console.log('Map loaded');

    // Define map icons for different bin types
    const iconPath = "http://maps.google.com/mapfiles/ms/micons/";
    const icons = {
        "recycling": {
            icon: iconPath + "green-dot.png"
        },
        "trash": {
            icon: iconPath + "yellow-dot.png"
        },
        "dog": {
            icon: iconPath + "orange-dot.png"
        }
    };

    // Read JSON and display map icons
    $.getJSON('/static/json/test-coords.json', function (data) {
        $.each(data.records, function (key, data) {
            if (urlParams.get("filter") === null || urlParams.get("filter") === data.type) {
                var coords = new google.maps.LatLng(data.lat, data.long);
                var pin = new google.maps.Marker({
                    position: coords,
                    map,
                    title: data.type,
                    icon: icons[data.type].icon
                });
                google.maps.event.addListener(pin, 'click', function () {
                    window.location.href = '/templates/bin-details.html&id=' + data.id;
                });
            }
        });
    });

    // Place location button
    infoWindow = new google.maps.InfoWindow();
    const locationButton = document.createElement("button");
    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(locationButton);
    locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Location found.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                    map.setZoom(18);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });
}

// Handle errors for when location button doesn't work
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}
