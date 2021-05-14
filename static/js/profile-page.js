// Delete the picture uploaded from the user account
function deletePicture() {
    let delete_confirm = document.getElementById("delete-button-modal");

    document.getElementById("delete-btn").addEventListener("click", function (event) {
    delete_confirm.style.display = "block";
    });

    // Close the modal by pressing X
    document.getElementById("btn-close").addEventListener("click", function(event) {
        delete_confirm.style.display = "none";
    });

    // Close the modal by pressing Close
    document.getElementById("close-btn").addEventListener("click", function(event) {
        delete_confirm.style.display = "none";
    });

    // Delete the picture from the screen
    document.getElementById("confirm-delete").addEventListener("click", function(event) {
   let garbage_pic = document.getElementById("picture1")
    garbage_pic.remove();
   delete_confirm.style.display = "none";
    });
}
deletePicture();


// Edit the user name
function editUsername() {
    let username = document.getElementById("user-name");
    let input_username = document.getElementById("change-username");
    let submit_username = document.getElementById("submit-new-username");

    document.getElementById("edit-name-btn").addEventListener("click", function(event) {
    username.style.display = "none";
    input_username.style.display = "block";
    submit_username.style.display = "block";
    });

    submit_username.addEventListener("click", function(event) {
        let new_name = input_username.value;
        username.textContent = new_name;
        username.style.display = "block";
        input_username.style.display = "none";
        submit_username.style.display = "none";
    })
}
editUsername();





