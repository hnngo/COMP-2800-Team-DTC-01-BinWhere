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
                if (response.type === "NEW") {
                    upvote.setAttribute("src", "/static/assets/icons/icon-thumb-up-filled.png");
                } else if (response.type === "RESET") {
                    upvote.setAttribute("src", "/static/assets/icons/icon-thumb-up.png");
                } else {
                    upvote.setAttribute("src", "/static/assets/icons/icon-thumb-up-filled.png");
                    downvote.setAttribute("src", "/static/assets/icons/icon-thumb-down.png");
                }
            } else {
                showWarningPopup(response.error);
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
                if (response.type === "NEW") {
                    downvote.setAttribute("src", "/static/assets/icons/icon-thumb-down-filled.png");
                } else if (response.type === "RESET") {
                    downvote.setAttribute("src", "/static/assets/icons/icon-thumb-down.png");
                } else {
                    downvote.setAttribute("src", "/static/assets/icons/icon-thumb-down-filled.png");
                    upvote.setAttribute("src", "/static/assets/icons/icon-thumb-up.png");
                }
            } else {
                showWarningPopup(response.error);
            }
        }
    })
})

// Commenting
const commentInputElem = document.querySelector(".commentInput");
const sendIconElem = document.querySelector(".sendIcon");

if (commentInputElem) {
    sendIconElem.addEventListener("click", () => {
        const commentContent = commentInputElem.value;

        $.ajax({
            url: "/comment",
            method: "POST",
            data: {
                content: commentContent,
                bin_id: binId
            },
            success: (response) => {
                console.log(response);
            }
        })
    });
}