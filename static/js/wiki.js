let search_result = [];
const state = Object.freeze({
    INIT: "INIT",
    LIST: "LIST",
    DETAIL: "DETAIL"
})
let currentState = state.INIT;

window.onload = () => {
    showCategory();

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
    });
}


function search(keyword) {
    if (!keyword) return;

    showSpinner();
    hideAllCurrentResultCard();
    hideResultData();
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
                search_result = [...response.data];
                hideCategory();
                setTimeout(() => {
                    renderCardResult(response.data);

                    currentState = state.LIST;
                    showBackToPrevious();
                }, 600)
            }
        }
    });
}

function showBackToPrevious() {
    const showBackButton = document.querySelector(".wiki-back-to-prev");
    if (showBackButton) {
        showBackButton.classList.remove("d-none");
        showBackButton.removeEventListener('click', handleClickBackToPrev);
        showBackButton.addEventListener('click', handleClickBackToPrev);
    }
}

function hideBackToPrevious() {
    const showBackButton = document.querySelector(".wiki-back-to-prev");
    if (showBackButton) {
        showBackButton.classList.add("d-none");
        showBackButton.removeEventListener('click', handleClickBackToPrev);
    }
}

function handleClickBackToPrev() {
    if (currentState === state.LIST) {
        document.querySelector(".wiki-search-input").value = "";
        currentState = state.INIT;
        hideBackToPrevious();
        hideAllCurrentResultCard();
        showCategory();
    } else if (currentState === state.DETAIL) {
        currentState = state.LIST;
        hideBackToPrevious();
        hideResultData();
        renderCardResult(search_result);
        setTimeout(() => showBackToPrevious(), 100);
    }
}

function hideCategory() {
    const categoryContainer = document.querySelector(".wiki-common-search-container");
    if (categoryContainer) {
        categoryContainer.classList.add("animate__animated");
        categoryContainer.classList.add("animate__fadeOutLeft");
        categoryContainer.classList.remove("animate__fadeInLeft");
        setTimeout(() => {
            categoryContainer.remove();
        }, 600);
    }
}

function showCategory() {
    const wikiContainer = document.querySelector('.wiki-container');
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add("wiki-common-search-container");
    categoryContainer.innerHTML = `
        <div class="wiki-common-item animate__animated animate__zoomIn">
            <div class="wiki-common-box">
                <img
                    class="wiki-common-icon"
                    src="/static/assets/icons/icon-bottle.png"
                />
            </div>
            <div class="wiki-common-title">Bottle</div>
        </div>
        <div class="wiki-common-item animate__animated animate__zoomIn">
            <div class="wiki-common-box">
                <img
                    class="wiki-common-icon"
                    src="/static/assets/icons/icon-can.png"
                />
            </div>
            <div class="wiki-common-title">Can</div>
        </div>
        <div class="wiki-common-item animate__animated animate__zoomIn">
            <div class="wiki-common-box">
                <img
                    class="wiki-common-icon"
                    src="/static/assets/icons/icon-card-box.png"
                />
            </div>
            <div class="wiki-common-title">Card box</div>
        </div>
        <div class="wiki-common-item animate__animated animate__zoomIn">
            <div class="wiki-common-box">
                <img
                    class="wiki-common-icon"
                    src="/static/assets/icons/icon-plastic.png"
                />
            </div>
            <div class="wiki-common-title">Plastic</div>
        </div>
        <div class="wiki-common-item animate__animated animate__zoomIn">
            <div class="wiki-common-box">
                <img
                    class="wiki-common-icon"
                    src="/static/assets/icons/icon-container.png"
                />
            </div>
            <div class="wiki-common-title">Container</div>
        </div>
        <div class="wiki-common-item animate__animated animate__zoomIn">
            <div class="wiki-common-box">
                <img
                    class="wiki-common-icon"
                    src="/static/assets/icons/icon-bag.png"
                />
            </div>
            <div class="wiki-common-title">Bag</div>
        </div>
    `;
    wikiContainer.appendChild(categoryContainer);
    addEventClickCategory();
}

function addEventClickCategory() {
    const commonItems = document.querySelectorAll(".wiki-common-item");
    commonItems.forEach(elem => {
        elem.addEventListener('click', () => {
            const value = elem.querySelector('.wiki-common-title').textContent.toLowerCase();
            document.querySelector(".wiki-search-input").value = value;
            search(value);
        })
    })
}

function hideAllCurrentResultCard() {
    $(".wiki-common-search-result-card").remove();
}

function renderCardResult(items) {
    const resultContainer = document.querySelector(".wiki-common-search-result");

    if (!items.length) {
        const cardContainer = document.createElement("div");
        cardContainer.setAttribute('class', "wiki-common-search-result-card wiki-common-no-result");
        cardContainer.textContent = `No results found`;
        resultContainer.appendChild(cardContainer);
        return;
    }

    items.forEach(item => {
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("wiki-common-search-result-card", "animate__animated", "animate__fadeInRight");
        cardContainer.innerHTML = `
            <img class="wiki-search-result-image" src="${item.image}" />
            <div class="wiki-search-result-text">
                <div class="wiki-search-result-name">${item.name}</div>
                <p class="wiki-search-result-description">${shortContent(item.description)}</p>
            </div>
        `;

        resultContainer.appendChild(cardContainer);

        cardContainer.addEventListener('click', () => {
            currentState = state.DETAIL;
            hideAllCurrentResultCard();
            showResultDetail(item);
        });
    });
}

function shortContent(text) {
    if (text.length > 50) {
        return text.substr(0, 50) + "...";
    }
    return text;
}

function hideResultData() {
    const wikiContent = document.querySelector(".wiki-detail-container");
    if (wikiContent) {
        wikiContent.remove();
    }
}

function showResultDetail(item) {
    const otherItems = [...search_result].filter((res) => res.id !== item.id);
    const wikiContainer = document.querySelector('.wiki-content-container');
    const cardDetailContainer = document.createElement('div');
    cardDetailContainer.classList.add("wiki-detail-container");
    cardDetailContainer.classList.add("animate__animated");
    cardDetailContainer.classList.add("animate__fadeInRight");

    cardDetailContainer.innerHTML = `
        <div class="wiki-detail-header">
            <img class="wiki-detail-image" src="${item.image}" />
            <div class="wiki-detail-meta">
                <div class="wiki-detail-name">${item.name}</div>
                <div class="wiki-detail-type">${item.type}</div>
            </div>
        </div>
        <div class="wiki-detail-body">
            <div class="wiki-detail-description">
                <span class="wiki-detail-description-label">Description: </span>
                ${item.description}
            </div>
            <div class="wiki-detail-not-include">
                <span class="wiki-detail-not-include-label">NOT INCLUDE: </span>
                ${item.type}
            </div>
        </div>
    `;

    if (otherItems.length) {
        let similar_html = "";
        otherItems.forEach(i => {
            similar_html += `
                <div class="wiki-similar-container">
                    <img class="wiki-similar-image" src="${i.image}" />
                    <div class="wiki-similar-name">${i.name}</div>
                </div>
            `;
        });
        cardDetailContainer.innerHTML += `
            <div class="wiki-detail-similar-title">Similar items:</div>
            <div class="wiki-detail-similar">
                ${similar_html}
            </div>
        `;
    }
    wikiContainer.appendChild(cardDetailContainer);
    addClickEventToSimilar(otherItems);
}

function addClickEventToSimilar(otherItems) {
    const similarItems = document.querySelectorAll(".wiki-similar-container");
    similarItems.forEach((elem, index) => {
        elem.addEventListener('click', () => {
            hideResultData();
            showResultDetail(otherItems[index]);
        });
    });
}
