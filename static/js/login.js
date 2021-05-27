window.onload = () => {
    const loginButton = document.querySelector("#login-button");
    const emailElem = document.querySelector('input[name="name"]');
    const passwordElem = document.querySelector('input[name="pass"]');

    loginButton.addEventListener('click', (event) => {
        event.preventDefault();
        showSpinner();

        $.ajax({
            url: "/login",
            method: "POST",
            data: {
                name: emailElem.value,
                pass: passwordElem.value
            },
            success: (response) => {
                clearSpinner();

                if (!response.error) {
                    window.location.href = "/";
                } else {
                    switch (response.error) {
                        case "MISSING_PASSWORD":
                        case "INVALID_PASSWORD":
                            showWarningPopup("Wrong password");
                            break;
                        case "EMAIL_NOT_FOUND":
                            showWarningPopup("Email not found");
                            break;
                        default:
                            showWarningPopup("Something is wrong, please try again!");
                            break;
                    }
                    passwordElem.value = "";
                }
            },
            fail: (err) => {
                clearSpinner();
                showWarningPopup("Something is wrong, please try again!");
            }
        });
    });
}
