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


// Select Waste Type
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