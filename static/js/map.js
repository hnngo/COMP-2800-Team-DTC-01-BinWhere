// API code has been adapted from examples given in the Google Maps API documentation.
// https://developers.google.com/maps/documentation/javascript/

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 49.2827, lng: -123.1207 },
    zoom: 12,
  });
  console.log('Map loaded');
}
