// Delete the picture uploaded from the user account
document.getElementById("delete-btn").addEventListener("click", function (event) {
    let delete_confirm = document.getElementById("delete-button-modal")
    delete_confirm.style.display = "block";

    // Close the modal by pressing X
    document.getElementById("btn-close").addEventListener("click", function(event) {
        delete_confirm.style.display = "none";
    });

    // Close the modal by pressing Close
    document.getElementById("close-btn").addEventListener("click", function(event) {
        delete_confirm.style.display = "none";
    });

    document.getElementById("confirm-delete").addEventListener("click", function(event) {
   let garbage_pic = document.getElementById("picture1")
    garbage_pic.remove();
   delete_confirm.style.display = "none";
    });
});




