window.onload = () => {
    const signupButton = document.querySelector("#signup-button");
    const nameElem = document.querySelector('input[name="name"]');
    const emailElem = document.querySelector('input[name="email"]');
    const passwordElem = document.querySelector('input[name="pass"]');
    const confirmPasswordElem = document.querySelector('input[name="confirm-pass"]');

    signupButton.addEventListener('click', (event) => {
        event.preventDefault();
        showSpinner()

        $.ajax({
            url: "/signup",
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
                        case "EMAIL_EXISTS":
                            showError("Email existed, please try another email");
                            break;
                        default:
                            showError("Something is wrong, please try again!");
                            break;
                    }
                    passwordElem.value = "";
                }
            },
            fail: (err) => {
                clearSpinner();
                showError("Something is wrong, please try again!");
            }
        })
    });

    function showError(msg) {
        alert(msg);
    }
}