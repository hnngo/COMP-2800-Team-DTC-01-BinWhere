let bin_address;
let geoAPIStart = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
let geoAPIEnd = '&key=AIzaSyCCHFhbJQACuCA70fcban9dr2GS8PuUiO8&result_type=street_address';

function reverseGeoCode() {
    $.getJSON(geoAPIStart + lat + ',' + long + geoAPIEnd, function (geoData) {
        bin_address = geoData.results[0].formatted_address;
        console.log("Address:" + bin_address);
    }).then(function () {
        $('#bin-details-location').append(bin_address);
    });
}
