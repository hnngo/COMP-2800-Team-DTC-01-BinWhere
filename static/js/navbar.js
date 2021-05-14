window.onload = () => {
    let isSidebarOpen = false;
    const navbarElement = document.querySelector("#navbar-icon");

    // Handle open hamburger menu
    if (navbarElement) {
        navbarElement.addEventListener('click', () => {
            const sidebarElem = document.querySelector("#sidebar");
            if (sidebarElem) {
                sidebarElem.classList.remove("d-none");
                sidebarElem.classList.remove("animate__slideOutLeft");
                sidebarElem.classList.add("animate__slideInLeft");
                isSidebarOpen = true;
            }
        });
    }

    // Handle close hamburger menu
    window.addEventListener('click', (event) => {
        const sidebarElem = document.querySelector("#sidebar");
        if (sidebarElem && isSidebarOpen && event.pageX > 287) {
                sidebarElem.classList.remove("animate__slideInLeft");
                sidebarElem.classList.add("animate__slideOutLeft");
                isSidebarOpen = false;
        }
    })
}
