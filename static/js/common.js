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

function getCurrentUserID() {
    return localStorage.getItem('user_id') || null;
}
