import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ===============================
// FIREBASE CONFIG
// ===============================

const firebaseConfig = {

    apiKey: "AIzaSyB3FCQ0PFQaQDwdjIvvVd3shQ_EXqL3iMA",

    authDomain:
        "mawaddat-fil-qurba.firebaseapp.com",

    databaseURL:
        "https://mawaddat-fil-qurba-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId:
        "mawaddat-fil-qurba",

    storageBucket:
        "mawaddat-fil-qurba.firebasestorage.app",

    messagingSenderId:
        "637175775327",

    appId:
        "1:637175775327:web:95da7d655c7606f5ef9bea"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


// ===============================
// ELEMENTS
// ===============================

const loginForm =
    document.getElementById("loginForm");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const forgotPassword =
    document.getElementById("forgotPassword");

const message =
    document.getElementById("message");


// ===============================
// ADMIN LOGIN
// ===============================

loginForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;


        if (!email || !password) {

            message.textContent =
                "Please enter email and password.";

            return;
        }


        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


            message.textContent =
                "Login successful!";


            window.location.href =
                "admin.html";


        }

        catch (error) {

            console.error(error);

            message.textContent =
                "Invalid email or password.";

        }

    }
);


// ===============================
// FORGOT PASSWORD
// ===============================

forgotPassword.addEventListener(
    "click",
    async (e) => {

        e.preventDefault();


        const email =
            emailInput.value.trim();


        if (!email) {

            message.textContent =
                "Please enter your Admin email first.";

            emailInput.focus();

            return;
        }


        try {

            await sendPasswordResetEmail(
                auth,
                email
            );


            message.textContent =
                "✅ Password reset email sent. Please check your inbox.";


        }

        catch (error) {

            console.error(error);

            message.textContent =
                "❌ Unable to send reset email. Please check the email address.";

        }

    }
);
