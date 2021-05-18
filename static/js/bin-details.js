const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let type, address;
let geoAPIStart = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
let geoAPIEnd = '&key=AIzaSyCCHFhbJQACuCA70fcban9dr2GS8PuUiO8&result_type=street_address';

$.getJSON('/static/json/test-coords.json', function (data) {
    $.each(data.records, function (key, data) {
        if (data.id === urlParams.get("id")) {
            type = data.type;
            $.getJSON(geoAPIStart + data.lat + ',' + data.long + geoAPIEnd, function (geoData) {
                address = geoData.results[0].formatted_address;
                console.log("Address:" + address);
            }).then(function () {
                $('#bin-details-location').append(address);
            });
        }
    });
}).then(function () {
    $('#bin-details-type').append(type);
});
