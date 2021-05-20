showSpinner();
let user_id = undefined;

window.onload = async () => {

    user_id = await getCurrentUserId();
    console.log(user_id);
    clearSpinner();

    if (user_id === null) {
        return window.location.href = "/login";
    }

    $(".container")[0].classList.remove("d-none");
}

// // Delete the picture uploaded from the user account
// function deletePicture() {
//
//     if ($("#delete-button-modal") !== null) {
//         // Click delete button to open the confirmation modal
//         $("#delete-btn").addEventListener("click", event => {
//             $("#delete-button-modal").style.display = "block";
//         })
//         // Close the modal by pressing X
//         $("#btn-close").addEventListener("click", function(event) {
//             $("#delete-button-modal").style.display = "none";
//         });
//
//         // Close the modal by pressing Close
//         $("#close-btn").addEventListener("click", function(event) {
//             $("#delete-button-modal").style.display = "none";
//         });
//
//         // Delete the picture from the screen
//         $("#confirm-delete").addEventListener("click", function(event) {
//             $("#picture1").remove();
//             $("#delete-button-modal").style.display = "none";
//         });
//     }
// }



// function deletePicture() {
//     let delete_confirm = document.getElementById("delete-button-modal");
//
//     document.getElementById("delete-btn").addEventListener("click", function (event) {
//     delete_confirm.style.display = "block";
//     // });

//     // Close the modal by pressing X
//     document.getElementById("btn-close").addEventListener("click", function(event) {
//         delete_confirm.style.display = "none";
//     });
//
//     // Close the modal by pressing Close
//     document.getElementById("close-btn").addEventListener("click", function(event) {
//         delete_confirm.style.display = "none";
//     });
//
//     // Delete the picture from the screen
//     document.getElementById("confirm-delete").addEventListener("click", function(event) {
//    let garbage_pic = document.getElementById("picture1")
//     garbage_pic.remove();
//    delete_confirm.style.display = "none";
//     });
// }


// // Edit the user name
// function editUsername() {
//     $("#edit-name-btn").addEventListener("click", function(event) {
//         $("#user-name").style.display = "none";
//         $("#change-username").style.display = "block";
//         $("#submit-new-username").style.display = "block";
//     });
//
//     $("#submit-new-username").addEventListener("click", function(event) {
//         $("#user-name").style.display = "block";
//         $("#change-username").style.display = "none";
//         $("#submit-new-username").style.display = "none";
//     })
// }
