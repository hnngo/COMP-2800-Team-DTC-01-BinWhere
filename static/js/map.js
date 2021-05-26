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
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false
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

    $.each(bins, function (key, data) {
        let bin = Object.keys(data)[0];

        // Show all icons if there is no filter.
        // If there is a filter, match any array that has at least one element of the query array.
        if (urlParams.get("filter") === null ||
            urlParams.get("filter").split(',').some(item => data[bin].type.includes(item))) {
            let coords = new google.maps.LatLng(data[bin].lat, data[bin].long);
            let pin = new google.maps.Marker({
                position: coords,
                map,
                title: bin,
                //icon: icons[data[bin].type].icon
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

    // Place Add-new-location button
    const addLocationButton = document.createElement("img");
    addLocationButton.src = "/static/assets/icons/icon-add-location.png";
    addLocationButton.setAttribute("id", "add-new-location-btn");
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(addLocationButton);
    addLocationButton.style.width = "60px";
    addLocationButton.style.transform = "translateX(-11px) translateY(-11px)";

    // Place pin icon on the center of the map
    const pinIcon = document.createElement("img");
    pinIcon.src = "/static/assets/icons/icon-pin-location.png";
    pinIcon.setAttribute("id", "pin-location")
    map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(pinIcon);
    pinIcon.style.width = "30px";
    pinIcon.style.transform = "translateX(-172px)";
    pinIcon.style.display = 'none';

    // Instruction of adding new location
    const instruction_msg = document.createElement("div");
    instruction_msg.textContent = "Place the pin on the desired location"
    instruction_msg.setAttribute("id", "instruction-message");
    instruction_msg.style.transform = "translateX(-52px) translateY(74px)";
    instruction_msg.style.width = "250px";
    instruction_msg.style.backgroundColor = "var(--primary-black)";
    instruction_msg.style.color = "white";
    instruction_msg.style.textAlign = "center";
    instruction_msg.style.padding = "20px 10px";
    instruction_msg.style.border = "5px solid var(--primary-green)";
    instruction_msg.style.fontSize = "20px";
    instruction_msg.style.display = "none";
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(instruction_msg);


    // Create two buttons: cancel and add
    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");
    buttonGroup.style.display = "none";
    buttonGroup.style.transform = "translate(-3px, 54px)";

    const cancelButton = document.createElement("img");
    cancelButton.src = "/static/assets/icons/icon-cancel-button.png";
    cancelButton.setAttribute("id", "cancel-btn")
    cancelButton.style.width = "100px";
    buttonGroup.appendChild(cancelButton);

    const addButton = document.createElement("img");
    addButton.src = "/static/assets/icons/icon-add-button.png";
    addButton.setAttribute("id", "add-btn")
    addButton.style.width = "100px";
    buttonGroup.appendChild(addButton);

    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(buttonGroup);

    // Show and move the pin icon
     addLocationButton.addEventListener("click",function() {
        addLocationButton.style.display = "none";
        pinIcon.style.display = "block";
        instruction_msg.style.display = "block";
        buttonGroup.style.display = "block";
    })

    cancelButton.addEventListener("click", function() {
        addLocationButton.style.display = "block";
        pinIcon.style.display = "none";
        instruction_msg.style.display = "none";
        buttonGroup.style.display = "none";
    })

    addButton.addEventListener("click", function() {
        showSpinner();

        // $.ajax({
        //     url: "/add",
        //     method: "POST",
        //     data: {
        //         location: map.getCenter().toJSON()
        //     },
        //     success: (response) => {
        //         if (!response.error) {
        //             clearSpinner();
        //             addLocationButton.style.display = "block";
        //             pinIcon.style.display = "none";
        //             instruction_msg.style.display = "none";
        //             buttonGroup.style.display = "none";
        //         } else {
        //             showWarningPopup("Something is wrong, please try again!");
        //         }
        //     },
        //     fail: (err) => {
        //         clearSpinner();
        //         showWarningPopup("Something is wrong, please try again!")
        //     }
        // })
    });

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
