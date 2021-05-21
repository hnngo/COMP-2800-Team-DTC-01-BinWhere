window.onload = () => {
    const searchInput = document.querySelector(".wiki-search-input");
    const searchIcon = document.querySelector(".wiki-search-icon");

    // Add event when entering input
    searchInput.addEventListener("keypress", (event) => {
        if (event.keyCode === 13) {
            search(searchInput.value);
        }
    });

    // Add event to when click icon
    searchIcon.addEventListener("click", (event) => {
        search(searchInput.value);
    })
}


function search(keyword) {
    showSpinner();
    $.ajax({
        url: "/search",
        method: "POST",
        data: {
            keyword: keyword,
            jsonOnly: true,
        },
        success: (response) => {
            clearSpinner();
            if (response.error) {
                showWarningPopup("There is something wrong, please try again!");
            } else {
                hideCategory();
                setTimeout(() => {
                    renderCardResult(response.data);
                }, 600)
            }
        }
    })
}

function hideCategory() {
    const categoryContainer = document.querySelector(".wiki-common-search-container");
    categoryContainer.classList.add("animate__animated");
    categoryContainer.classList.add("animate__fadeOutLeft");
    categoryContainer.classList.remove("animate__fadeInLeft");
}

function showCategory() {
    const categoryContainer = document.querySelector(".wiki-common-search-container");
    categoryContainer.classList.add("animate__animated");
    categoryContainer.classList.add("animate__fadeInLeft");
    categoryContainer.classList.remove("animate__fadeOutLeft");
}

function renderCardResult(items) {
    const resultContainer = document.querySelector(".wiki-common-search-result");

    items.forEach(item => {
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("wiki-common-search-result-card", "animate__animated", "animate__fadeInRight");
        cardContainer.innerHTML = `
            <img class="wiki-search-result-image" src="${item.image}" />
            <div class="wiki-search-result-text">
                <div class="wiki-search-result-name">${item.name}</div>
                <p class="wiki-search-result-description">${shortContent(item.description)}</p>
            </div>
        `

        resultContainer.appendChild(cardContainer);
    })

}

function shortContent(text) {
    if (text.length > 50) {
        return text.substr(0, 50) + "...";
    }
    return text;
}