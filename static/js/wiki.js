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
    console.log(keyword);
}