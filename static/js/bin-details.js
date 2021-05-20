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

// VOTING
const upvote = document.getElementById("thumbs-up");
const downvote = document.getElementById("thumbs-down");
const urlParams = new URLSearchParams(window.location.search);
const binId = urlParams.get('id');

upvote.addEventListener('click', function() {
    $.ajax({
        url: "/upvote",
        method: "POST",
        data: JSON.stringify({
            bin_id: binId
        }),
        contentType: "application/json",
        success: function(response) {
            if (!response.error) {
                alert("Success!")
            } else {
                alert("Error!")
            }
        }
    })
})


downvote.addEventListener('click', function() {
    $.ajax({
        url: "/downvote",
        method: "POST",
        data: JSON.stringify({
            bin_id: binId
        }),
        contentType: "application/json",
        success: function(response) {
            if (response.error === 0) {
                alert("Success!")
            } else {
                alert("Error!")
            }
        }
    })
})