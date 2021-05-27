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
    console.log(!!document.getElementById("delete-btn"));
    if (!!document.getElementById("delete-btn")) {
            deletePicture();
    }
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
        showSpinner();

        $.ajax({
            url: "/profile/name",
            method: "POST",
            data: {
                name: change_username.value
            },
            success: (response) => {
                if (!response.error) {
                    clearSpinner();
                    user_name.style.display = "block";
                    user_name.textContent = change_username.value;
                    showSuccessPopup("User name is updated successfully!")
                } else {
                    showWarningPopup("Something is wrong, please try again!");
                }
            },
            fail: (err) => {
                clearSpinner();
                showWarningPopup("Something is wrong, please try again!")
            }
        });
    });
}


// Edit user avatar
function editUserAvatar() {
    const new_avatar = document.querySelector('input[name="avatar"]');

    new_avatar.addEventListener('change', (event) => {
        if (event.target.files && event.target.files.length <= 0) {
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const dataURL = reader.result;
            showSpinner();
            $.ajax({
                url: '/profile/avatar',
                method: "POST",
                data: {
                   avatar: dataURL
                },
                success: (response) => {
                    if (!response.error) {
                        clearSpinner();
                        document.querySelector("#user-img")
                            .setAttribute("src", "data:image/png;base64," + response.updated_img);
                        new_avatar.value = "";

                    } else {
                        clearSpinner();
                        showWarningPopup("The image file is too big!");
                        new_avatar.value = "";
                        }
                },
                fail: (err) => {
                    clearSpinner();
                    showWarningPopup("Something is wrong, please try again!");
                }
            });
        }

        // Read in the image file as a data URL.
        reader.readAsDataURL(event.target.files[0]);
    });
}


// Delete the picture uploaded from the user account
function deletePicture() {
    const delete_button_modal = document.getElementById("delete-button-modal");
    const btn_close = document.getElementById("btn-close");
    const close_btn = document.getElementById("close-btn");
    const confirm_delete = document.getElementById("confirm-delete");

    const delete_btn = document.getElementById("delete-btn");
    let bin_id = delete_btn.getAttribute("data-id");

    // Click delete button to open the confirmation modal
    delete_btn.addEventListener("click", function(event) {
        delete_button_modal.style.display = "block";

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
            event.preventDefault();
            showSpinner();

            $.ajax({
                url:"/profile/bin",
                method: "DELETE",
                data: {
                    "bin_id": bin_id
                },
                success: (response) => {
                    if (!response.error) {
                        clearSpinner();
                        delete_button_modal.style.display = "none";
                        if (delete_btn.getAttribute("data-id") === bin_id) {
                            document.getElementById(bin_id).remove();
                        }
                        showSuccessPopup("Deleted Successfully!");
                    } else {
                        showWarningPopup("Something is wrong, please try again!");
                    }

                },
                fail: (err) => {
                    clearSpinner();
                    showWarningPopup("Something is wrong, please try again!");
                }
            });
        });
    });
}
