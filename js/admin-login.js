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

    authDomain: "mawaddat-fil-qurba.firebaseapp.com",

    databaseURL:
        "https://mawaddat-fil-qurba-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId: "mawaddat-fil-qurba",

    storageBucket:
        "mawaddat-fil-qurba.firebasestorage.app",

    messagingSenderId: "637175775327",

    appId:
        "1:637175775327:web:95da7d655c7606f5ef9bea"
};


// ===============================
// FIREBASE
// ===============================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


// ===============================
// GET HTML ELEMENTS
// ===============================

const loginForm =
    document.getElementById("loginForm");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const message =
    document.getElementById("message");


// ===============================
// LOGIN
// ===============================

if (loginForm) {

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

}


// ===============================
// CREATE FORGOT PASSWORD BUTTON
// ===============================

// اگر HTML میں button/link موجود نہیں تو
// JavaScript خود بنا دے گا۔

let forgotPassword =
    document.getElementById("forgotPassword");


if (!forgotPassword) {

    forgotPassword =
        document.createElement("button");

    forgotPassword.id =
        "forgotPassword";

    forgotPassword.type =
        "button";

    forgotPassword.textContent =
        "Forgot Password?";

    forgotPassword.style.display =
        "block";

    forgotPassword.style.width =
        "100%";

    forgotPassword.style.marginTop =
        "15px";

    forgotPassword.style.padding =
        "12px";

    forgotPassword.style.border =
        "none";

    forgotPassword.style.borderRadius =
        "25px";

    forgotPassword.style.background =
        "#6B2020";

    forgotPassword.style.color =
        "#ffffff";

    forgotPassword.style.cursor =
        "pointer";

    forgotPassword.style.fontWeight =
        "bold";


    if (loginForm) {

        loginForm.parentNode.insertBefore(
            forgotPassword,
            loginForm.nextSibling
        );

    }

}


// ===============================
// FORGOT PASSWORD
// ===============================

forgotPassword.addEventListener(
    "click",
    async () => {

        const email =
            emailInput.value.trim();


        if (!email) {

            message.textContent =
                "Please enter your Admin email first.";

            emailInput.focus();

            return;
        }


        message.textContent =
            "Sending password reset email...";


        try {

            await sendPasswordResetEmail(
                auth,
                email
            );


            message.textContent =
                "✅ Password reset email sent! Check your email inbox.";

        }

        catch (error) {

            console.error(
                "Password Reset Error:",
                error
            );


            message.textContent =
                "❌ " + error.message;

        }

    }
);
