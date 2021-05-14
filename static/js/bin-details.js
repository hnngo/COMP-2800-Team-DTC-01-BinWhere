const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let lat, long, type;

$.getJSON('/static/json/test-coords.json', function (data) {
    $.each(data.records, function (key, data) {
        if (data.id === urlParams.get("id")) {
            lat = data.lat;
            long = data.long;
            type = data.type
        }
    });
}).then(function () {
    console.log(type);
    $('#bin-details-type').append(type);
    //$('#bin-details-location').append(address);
});




