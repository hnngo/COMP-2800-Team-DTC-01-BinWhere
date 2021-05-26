// API code has been adapted from examples given in the Google Maps API documentation.
// https://developers.google.com/maps/documentation/javascript/

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let map, infoWindow;

function initMap() {
    // Display the map
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 49.2827, lng: -123.1207 },
        zoom: 15,
        fullscreenControl: false,
        mapTypeControl: false
    });
    console.log('Map loaded');

    // Define map icons for different bin types
    // Icons downloaded from https://icons8.com/
    const iconPath = "/static/assets/icons/map/";
    const icons = {
        "container": {
            icon: iconPath + "icon-container.png"
        },
        "paper": {
            icon: iconPath + "icon-paper.png"
        },
        "hazardous": {
            icon: iconPath + "icon-hazardous.png"
        },
        "garbage": {
            icon: iconPath + "icon-garbage.png"
        },
        "glass": {
            icon: iconPath + "icon-glass.png"
        },
        "food": {
            icon: iconPath + "icon-food.png"
        },
        "multiple": {
            icon: iconPath + "icon-multiple.png"
        }
    };

    $.each(bins, function (key, data) {
        let bin = Object.keys(data)[0];

        // Show all icons if there is no filter.
        // If there is a filter, match any array that has at least one element of the query array.
        if (urlParams.get("filter") === null ||
            urlParams.get("filter").split(',').some(item => data[bin].type.includes(item))) {
            let coords = new google.maps.LatLng(data[bin].lat, data[bin].long);
            let binType = data[bin].type;
            if (binType.length > 1) {
                binType = "multiple";
            } else {
                binType = binType[0];
            }
            let pin = new google.maps.Marker({
                position: coords,
                map,
                title: bin,
                icon: {
                    url: icons[binType].icon,
                    scaledSize: new google.maps.Size(25, 25)
                }
            });
            google.maps.event.addListener(pin, 'click', function () {
                    window.location.href = '/bin?id=' + bin;
            });
        }
    });

    // Place location button
    infoWindow = new google.maps.InfoWindow();
    const locationButton = document.createElement("img");
    locationButton.src = "/static/assets/icons/icon-current-location.png";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(locationButton);
    locationButton.style.width = "60px";
    locationButton.style.transform = "translateX(15px)";
    locationButton.addEventListener("click", geoLocate);

    // Automatically center the map on your location when first loading the page and no focus is set.
    if (urlParams.get("focus") === null) {
        geoLocate();
    } else {
        const pos = {
            lat: Number(urlParams.get("focus").split(",")[0]),
            lng: Number(urlParams.get("focus").split(",")[1])
        };
        map.setCenter(pos);
        map.setZoom(18);
    }

    // Hmm I wonder what this is for...
    if (urlParams.get("filter") === "muppet") {
        let coords = new google.maps.LatLng(49.130527980885006, -121.9536234401931);
            let pin = new google.maps.Marker({
            position: coords,
            map,
            title: "Oscar",
            icon: "/static/assets/icons/grouch-icon.png"
        });
        google.maps.event.addListener(pin, 'click', function () {
            showErrorPopup("Your favicon is trash! -2 marks.");
        });
    }
}

function geoLocate() {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                localStorage.setItem('currentPos', JSON.stringify(pos));
                infoWindow.setPosition(pos);
                infoWindow.setContent("Location found.");
                infoWindow.open(map);
                map.setCenter(pos);
                map.setZoom(15);
            },
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
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
