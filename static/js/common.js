function showSpinner() {
    const bodyElem = document.querySelector('body');

    const loading = document.createElement("div");
    loading.setAttribute("id", "spinner");
    loading.setAttribute(
        "style",
        "position: absolute; top: 0px; left: 0px; background-color: rgba(255, 255, 255, 0.70);"
    );
    loading.innerHTML = `  
        <div class="d-flex justify-content-center align-items-center" style="width: 100vw; height: 100vh;">
          <div class="spinner-border" style="width: 4rem; height: 4rem;" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
    `;
    bodyElem.appendChild(loading);
}