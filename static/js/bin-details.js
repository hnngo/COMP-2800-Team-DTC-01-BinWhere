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
        showSpinner();
        const commentContent = commentInputElem.value;
        commentInputElem.value = "";

        $.ajax({
            url: "/comment",
            method: "POST",
            data: {
                content: commentContent,
                bin_id: binId
            },
            success: (response) => {
                clearSpinner();
                if (response.error) {
                    showErrorPopup('Something is wrong, please try again');
                } else {
                    addNewComment(commentContent, response.name, response.avatar);
                    updateDataIndex();
                }
            },
            fail: (error) => {
                clearSpinner();
                showErrorPopup('Something is wrong, please try again');
            }
        })
    });
}

function addNewComment(commentContent, name, avatar) {
    const commentWrapper = document.createElement('div');
    commentWrapper.setAttribute('class', 'comment-container');
    commentWrapper.innerHTML = `
        <img class="comment-avatar" alt="avatar" src="data:image/png;base64,${avatar}"/>
        <div class="comment-content-container">
            <strong class="comment-name">${name}:&nbsp;</strong>
            <span class="comment-content">${commentContent}</span>
        </div>
        <img class="comment-delete" alt="avatar" src="static/assets/icons/icon-delete-v2.png"/>
    `

    const commentList = document.querySelector('.commentList');
    commentList.prepend(commentWrapper);
}

const allDeleteIcons = document.querySelectorAll('.comment-delete');
allDeleteIcons.forEach(element => {
    element.addEventListener('click', () => {
        const indexInUI = parseInt(element.parentElement.getAttribute('data-index')) - 1;
        const totalComments = document.querySelectorAll("div.comment-container").length;
        const realIndex = totalComments - 1 - indexInUI;

        showSpinner();
        $.ajax({
            url: "/comment",
            method: "DELETE",
            data: {
                comment_index: realIndex,
                bin_id: binId
            },
            success: (response) => {
                clearSpinner();
                if (response.error) {
                    showErrorPopup('Something is wrong, please try again');
                } else {
                    element.parentElement.remove();
                    updateDataIndex();
                }
            },
            fail: (error) => {
                clearSpinner();
                showErrorPopup('Something is wrong, please try again');
            }
        })
    })
});

function updateDataIndex() {
    const allCommentsWrapper = document.querySelectorAll("div.comment-container");
    allCommentsWrapper.forEach((element, index) => {
        element.setAttribute("data-index", index + 1);
    });
}