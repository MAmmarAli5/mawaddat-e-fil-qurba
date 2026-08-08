// =====================================================
// STUDENT LOGIN
// =====================================================


// =====================================================
// FIREBASE IMPORTS
// =====================================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {
    getAuth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// =====================================================
// FIREBASE CONFIG
// =====================================================

const firebaseConfig = {

    apiKey:
        "AIzaSyB3FCQ0PFQaQDwdjIvvVd3shQ_EXqL3iMA",

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


// =====================================================
// FIREBASE INITIALIZATION
// =====================================================

const app =
    initializeApp(firebaseConfig);

const auth =
    getAuth(app);


// =====================================================
// HTML ELEMENTS
// =====================================================

const loginForm =
    document.getElementById(
        "studentLoginForm"
    );


const emailInput =
    document.getElementById(
        "email"
    );


const passwordInput =
    document.getElementById(
        "password"
    );


const message =
    document.getElementById(
        "message"
    );


const forgotPassword =
    document.getElementById(
        "forgotPassword"
    );


// =====================================================
// STUDENT LOGIN
// =====================================================

loginForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const email =
            emailInput.value.trim();


        const password =
            passwordInput.value;


        if (!email || !password) {

            message.textContent =
                "Please enter your email and password.";

            message.className =
                "message error";

            return;

        }


        message.textContent =
            "Logging in...";


        message.className =
            "message";


        try {


            const userCredential =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            const user =
                userCredential.user;


            console.log(
                "Student logged in:",
                user.uid
            );


            message.textContent =
                "Login successful!";


            message.className =
                "message success";


            /*
             * اگر طالب علم نے Online Exam
             * کے بٹن سے login کیا ہے
             * تو اسے Exam پر بھیجیں۔
             */

            const params =
                new URLSearchParams(
                    window.location.search
                );


            const redirect =
                params.get("redirect");


            if (redirect === "exam") {

                window.location.href =
                    "exam.html";

            }

            else {

                window.location.href =
                    "student-dashboard.html";

            }


        }

        catch (error) {


            console.error(
                "Login Error:",
                error
            );


            message.className =
                "message error";


            if (
                error.code ===
                "auth/invalid-credential"
            ) {

                message.textContent =
                    "Email or password is incorrect.";

            }

            else if (
                error.code ===
                "auth/invalid-email"
            ) {

                message.textContent =
                    "Please enter a valid email address.";

            }

            else {

                message.textContent =
                    "Unable to login. Please try again.";

            }

        }

    }
);


// =====================================================
// FORGOT PASSWORD
// =====================================================

forgotPassword.addEventListener(
    "click",
    async (event) => {

        event.preventDefault();


        const email =
            emailInput.value.trim();


        if (!email) {

            message.textContent =
                "Please enter your email address first.";

            message.className =
                "message error";

            emailInput.focus();

            return;

        }


        try {


            await sendPasswordResetEmail(
                auth,
                email
            );


            message.textContent =
                "Password reset email has been sent. Please check your inbox.";

            message.className =
                "message success";


        }

        catch (error) {


            console.error(
                "Password Reset Error:",
                error
            );


            message.textContent =
                "Unable to send password reset email.";

            message.className =
                "message error";

        }

    }
);
