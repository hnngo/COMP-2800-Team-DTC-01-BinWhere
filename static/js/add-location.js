let uploadedImage = undefined;

window.onload = async() => {
    showSpinner();
    let user_id = undefined;

    user_id = await getCurrentUserId();
    console.log(user_id);
    clearSpinner();

    if (user_id === null) {
        return window.location.href = "/login";
    }

    $(".container")[0].classList.remove("d-none");

    selectWasteType();

    displaySelectedImg();
}

function reverseGeoCode() {
    let bin_address;
    let geoAPIStart = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
    let geoAPIEnd = '&key=AIzaSyCCHFhbJQACuCA70fcban9dr2GS8PuUiO8&result_type=street_address';

    $.getJSON(geoAPIStart + new_lat + ',' + new_long + geoAPIEnd, function (geoData) {
        bin_address = geoData.results[0].formatted_address;
        console.log("Address:" + bin_address);
    }).then(function () {
        $('#bin-details-location').append(bin_address);
    });
}

// Select Waste Type
function selectWasteType() {
    const selectPostTag = document.querySelector("#types");
    const selectPostTagWrapper = document.querySelector(".tag-chosen");

    if (selectPostTag && selectPostTagWrapper) {
        selectPostTag.addEventListener("change", (event) => {
            const selectedValue = event.target.value;
            const currentSelectedValue =
                selectPostTagWrapper.getAttribute("data-chosen") || "";

            if (currentSelectedValue.indexOf(selectedValue) >= 0) {
                // Remove tag bubble
                selectPostTagWrapper.querySelectorAll("span").forEach((elem) => {
                    if (elem.innerText === selectedValue) {
                        elem.remove();
                    }
                    const newDataChosen = currentSelectedValue
                        .split(",")
                        .filter((val) => !!val && val !== selectedValue)
                        .join(",");
                    selectPostTagWrapper.setAttribute("data-chosen", newDataChosen);
                });
            } else {
                // Create tag bubble
                const tagElem = document.createElement("span");
                tagElem.setAttribute("class", "tag-bubble");
                tagElem.innerText = ` ${selectedValue} `;
                selectPostTagWrapper.appendChild(tagElem);
                selectPostTagWrapper.setAttribute(
                    "data-chosen",
                    currentSelectedValue + `,${selectedValue}`
                );
            }

            // Reset
            event.target.value = "";
        });
    }
}

// Display the selected image on the page
function displaySelectedImg() {
    const selectedFile = document.getElementById("bin-details-images");

    selectedFile.addEventListener("change", (event) => {
        if (event.target.files && event.target.files.length <= 0) {
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            uploadedImage = reader.result;
            document.querySelector(".bin-image-container img").src = reader.result;
            selectedFile.value = "";
            submitNewData(reader.result);
        }
        reader.readAsDataURL(event.target.files[0]);
    })
}

// Submit new bin data
function submitNewData(imageData) {
    const submitBtn = document.getElementById("saveButton");

    submitBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const selectedType = document.querySelector(".tag-chosen").getAttribute("data-chosen");
        const selectedTypeList = selectedType.substr(1,)
        showSpinner();

        $.ajax({
            url: '/add/save',
            method: "POST",
            data: {
                image: imageData,
                type: selectedTypeList,
                lat: new_lat,
                long: new_long
            },
            success: (response) => {
                if (!response.error) {
                    clearSpinner();
                    showSuccessPopup("New location is successfully saved!", () => {
                        window.location.href = "/";
                    });

                } else {
                    clearSpinner();
                    showWarningPopup("The image file is too big!", () => {
                        document.querySelector(".bin-image-container img").src = "/static/assets/icons/icon-add-image.png";
                    });
                }
            },
            fail: (err) => {
                clearSpinner();
                showWarningPopup("Something is wrong, please try again!");
            }
        })
    })
}