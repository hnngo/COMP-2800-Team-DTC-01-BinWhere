function showSpinner() {
    const body = document.querySelector("body");
    const loading = document.createElement("div");
    loading.setAttribute("id", "spinner");
    loading.setAttribute(
        "style",
        "position: absolute; " +
        "top: 0px; left: 0px; background-color: rgba(255, 255, 255, 0.12);" +
        "width: 100vw; height: 100vh;" +
        "display: flex;" +
        "justify-content: center;" +
        "align-items: center;"
    );
    loading.innerHTML = `  
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    `;
    body.appendChild(loading);
}

function clearSpinner() {
    const spinner = document.querySelector("#spinner");
    if (spinner) {
        spinner.remove();
    }
}

function getCurrentUserId() {
    return new Promise((res, rej) => {
        $.ajax({
            url: "/current-user",
            success: (data) => {
                if (data && data.session_id !== "" && data.user_id !== "") {
                    res(data.user_id);
                } else {
                    res(null);
                }
            }
        })
    });
}

function showWarningPopup(message, onClose) {
    const body = document.querySelector("body");
    const popup = document.createElement("div");
    popup.setAttribute('class', "popup--warning-container");

    popup.innerHTML = `
        <div class="popup--warning-content">
            <img
                class="popup--warning-icon-warning"
                src="static/assets/icons/icon-warning.png"
                alt="warning"
            />
            <img
                class="popup--warning-icon-close"
                src="static/assets/icons/icon-close.png"
                alt="close"
            />
            <div class="popup--warning-message">${message}</div>
        </div>
    `;
    body.append(popup);


    const closePopupElem = document.querySelector(".popup--warning-icon-close");
    if (closePopupElem) {
        closePopupElem.addEventListener('click', () => {
            if (onClose && typeof onClose === 'function') {
                onClose();
            }
            popup.remove();
        })
    }
}

function showErrorPopup(message, onClose) {
    const body = document.querySelector("body");
    const popup = document.createElement("div");
    popup.setAttribute('class', "popup--error-container");

    popup.innerHTML = `
        <div class="popup--error-content">
            <img
                class="popup--error-icon-error"
                src="static/assets/icons/icon-error.png"
                alt="warning"
            />
            <img
                class="popup--error-icon-close"
                src="static/assets/icons/icon-close-error.png"
                alt="close"
            />
            <div class="popup--error-message">${message}</div>
        </div>
    `;
    body.append(popup);


    const closePopupElem = document.querySelector(".popup--error-icon-close");
    if (closePopupElem) {
        closePopupElem.addEventListener('click', () => {
            if (onClose && typeof onClose === 'function') {
                onClose();
            }
            popup.remove();
        })
    }
}


function showSuccessPopup(message, onClose) {
    const body = document.querySelector("body");
    const popup = document.createElement("div");
    popup.setAttribute('class', "popup--success-container");

    popup.innerHTML = `
        <div class="popup--success-content">
            <img
                class="popup--success-icon-success"
                src="static/assets/icons/icon-success.png"
                alt="warning"
            />
            <img
                class="popup--success-icon-close"
                src="static/assets/icons/icon-close-success.png"
                alt="close"
            />
            <div class="popup--success-message">${message}</div>
        </div>
    `;
    body.append(popup);


    const closePopupElem = document.querySelector(".popup--success-icon-close");
    if (closePopupElem) {
        closePopupElem.addEventListener('click', () => {
            if (onClose && typeof onClose === 'function') {
                onClose();
            }
            popup.remove();
        })
    }
}