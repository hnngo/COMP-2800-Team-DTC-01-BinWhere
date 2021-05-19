// Your web app's Firebase configuration
var firebaseConfig = {
    "apiKey": "AIzaSyDSYK82Mx-NG_V3xPCMGmnsr2E1ymozuLc",
    "authDomain": "bin-where.firebaseapp.com",
    "projectId": "bin-where",
    "storageBucket": "bin-where.appspot.com",
    "messagingSenderId": "1089306681117",
    "appId": "1:1089306681117:web:669285ca016d0dd806cbf4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function () {
      setTimeout(() => {
         const firebaseLogin = document.querySelector("#firebaseui-auth-container form");

        const logoNameDiv = document.createElement('div');
        logoNameDiv.classList.add('logo_name');
        const logoNameImg = document.createElement('img');
        logoNameImg.setAttribute('src', '/static/assets/images/temp_logo_name.png')
        logoNameDiv.appendChild(logoNameImg);

        firebaseLogin.prepend(logoNameDiv)
      }, 1000)


      // The widget is rendered.
      // Hide the loader.
      // const originalForm = document.getElementById("origin-form");
      // originalForm.innerHTML = `
      //   <form action="/login" method="post">
      //     <div class = "logo_name">
      //         <img src= "{{ url_for('static', filename="assets/images/temp_logo_name.png") }}"
      //              alt = "logo_name">
      //     </div>
      //     <div class = "logo_icons">
      //         <img src= "{{ url_for('static', filename="assets/images/temp_bin_icons.png") }}"
      //              alt = "logo_icons">
      //     </div>
      //     <div class = "login_container">
      //         <div class = "input_container">
      //             <div class = "email_container">
      //                 <div class = "email_address">
      //                     <h4> EMAIL ADDRESS</h4>
      //                 </div>
      //                 <div class = "get_email">
      //                     <img src= "{{ url_for('static', filename="assets/icons/icon-profile.png") }}"
      //                             alt = "icon-password"/>
      //                     <input name="name" type="text" placeholder="Type your email address" />
      //                 </div>
      //             </div>
      //             <div class = "password_container">
      //                 <div class = "password">
      //                     <h4>PASSWORD</h4>
      //                 </div>
      //                 <div class = "get_password">
      //
      //                     <img src= "{{ url_for('static', filename="assets/icons/icon-password.png") }}"
      //                             alt = "icon-password">
      //                     <input name="pass" type="password" placeholder="Type your password" />
      //                 </div>
      //             </div>
      //         </div>
      //         <div class = "login_button_container">
      //             <button type = "submit" name ="submit">LOGIN IN</button>
      //         </div>
      //     </div>
      //     <div class = "no_account">
      //         <p>DON'T HAVE AN ACCOUNT YET?</p>
      //     </div>
      //     <div class = "signup">
      //         <p><U>SIGN UP</U></p>
      //     </div>
      //
      // </form>
      // `
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "../main.html",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: "#",
  // Privacy policy url.
  privacyPolicyUrl: "#",
};

// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);
