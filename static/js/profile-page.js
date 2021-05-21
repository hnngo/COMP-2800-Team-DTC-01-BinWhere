window.onload = async () => {
    showSpinner();
    let user_id = undefined;

    user_id = await getCurrentUserId();
    console.log(user_id);
    clearSpinner();

    if (user_id === null) {
        return window.location.href = "/login";
    }

    $(".container")[0].classList.remove("d-none");

    editUsername();
    editUserAvatar();
    deletePicture();
}


// Edit User Name
function editUsername() {
    const edit_name_btn = document.querySelector("#edit-name-btn");
    const user_name = document.querySelector("#user-name");
    const change_username = document.querySelector('input[name="name"]');
    const submit_new_username = document.querySelector("#submit-new-username");

    // Show the text box to input new user name
    edit_name_btn.addEventListener("click", function(event) {
        user_name.style.display = "none";
        change_username.style.display = "block";
        submit_new_username.style.display = "block";
    });

    // Submit new user name
    submit_new_username.addEventListener("click", function(event) {
        change_username.style.display = "none";
        submit_new_username.style.display = "none";

        event.preventDefault();
        showSpinner()

        $.ajax({
            url: "/profile/name",
            method: "POST",
            data: {
                name: change_username.value
            },
            success: (response) => {
                clearSpinner();
                user_name.style.display = "block";
                showSuccessPopup("User name is updated successfully!")
            },
            fail: (err) => {
                clearSpinner();
                showWarningPopup("Something is wrong, please try again!")
            }
        })
    });
}


// Edit user avatar
function editUserAvatar() {
    const new_avatar = document.querySelector('input[name="avatar"]');
    const select_btn = document.querySelector("#select");

    new_avatar.addEventListener("click", (event) => {
        event.preventDefault();
        select_btn.style.display = "block"
    });

    select_btn.addEventListener("click", (event) => {
        $.ajax({
            url:"/profile/avatar",
            method: "POST",
            data: {
                avatar: new_avatar
            },
            success: (response) => {
                clearSpinner();
                if (!response.error) {
                    showSuccessPopup("User avatar is updated successfully!")
                }
            },
            fail: (err) => {
                clearSpinner();
                showWarningPopup("Something is wrong, please try again!")
            }
        })
    })
}


// Delete the picture uploaded from the user account
function deletePicture() {
    const delete_button_modal = document.querySelector("#delete-button-modal");
    const delete_btn = document.querySelector("#delete-btn");
    const btn_close = document.querySelector("#btn-close");
    const close_btn = document.querySelector("#close_btn");
    const confirm_delete = document.querySelector("#confirm-delete");

    if (delete_btn !== null) {
        // Click delete button to open the confirmation modal
        delete_btn.addEventListener("click", event => {
            delete_button_modal.style.display = "block";
        })
        // Close the modal by pressing X
        btn_close.addEventListener("click", function(event) {
            delete_button_modal.style.display = "none";
        });

        // Close the modal by pressing Close
       close_btn.addEventListener("click", function(event) {
            delete_button_modal.style.display = "none";
        });

        // Delete the picture from the screen
        confirm_delete.addEventListener("click", function(event) {
            let bin = delete_btn.getAttribute("id")

            $.ajax({
                url:"/profile/bin",
                method: "DELETE",
                data: {
                    "bin_id": bin.slice(10,)
                },
                success: (response) => {
                    event.target.parentElement.parentElement.remove();
                    delete_button_modal.style.display = "none";
                    showSuccessPopup("Deleted Successfully!")
                },
                fail: (err) => {
                    showWarningPopup("Something is wrong, please try again!");
                }
            })
        });
    }
}