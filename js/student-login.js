// ========================================
// FIREBASE AUTHENTICATION
// STUDENT LOGIN
// ========================================

import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ========================================
// FIREBASE CONFIG
// ========================================

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


// ========================================
// INITIALIZE FIREBASE
// ========================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


// ========================================
// HTML ELEMENTS
// ========================================

const loginForm =
    document.getElementById("loginForm");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const loginBtn =
    document.getElementById("loginBtn");

const message =
    document.getElementById("message");


// ========================================
// STUDENT LOGIN
// ========================================

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;

    if (!email || !password) {

        message.style.color = "red";

        message.innerText =
            "Email اور Password درج کریں۔";

        return;
    }


    loginBtn.disabled = true;

    loginBtn.innerText =
        "Login ہو رہا ہے...";


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
            "Student Login Successful:",
            user.uid
        );


        message.style.color =
            "green";

        message.innerText =
            "Login کامیاب ہوگیا۔";


        // =================================
        // TEMPORARY DASHBOARD REDIRECT
        // =================================

        setTimeout(() => {

            window.location.href =
                "student-dashboard.html";

        }, 1000);


    }

    catch (error) {

        console.error(error);

        message.style.color =
            "red";


        if (error.code ===
            "auth/invalid-credential") {

            message.innerText =
                "Email یا Password غلط ہے۔";

        }

        else if (error.code ===
            "auth/user-not-found") {

            message.innerText =
                "یہ Email موجود نہیں ہے۔";

        }

        else if (error.code ===
            "auth/wrong-password") {

            message.innerText =
                "Password غلط ہے۔";

        }

        else {

            message.innerText =
                "Login میں مسئلہ آیا۔ دوبارہ کوشش کریں۔";

        }


        loginBtn.disabled = false;

        loginBtn.innerText =
            "Login";

    }

});
