window.onload = () => {
    const loginButton = document.querySelector("#login-button");
    const emailElem = document.querySelector('input[name="name"]');
    const passwordElem = document.querySelector('input[name="pass"]');

    loginButton.addEventListener('click', (event) => {
        event.preventDefault();

        $.ajax({
            url: "/login",
            method: "POST",
            data: {
                name: emailElem.value,
                pass: passwordElem.value
            },
            success: (response) => {
                if (!response.error) {
                    localStorage.setItem('session_id', response.sessionId);
                    localStorage.setItem('user_id', response.sessionId);
                    window.location.href = "/";
                } else {
                    showError();
                }
            },
            fail: (err) => {
                showError();
            }
        })
    });


    function showError() {

    }
}
