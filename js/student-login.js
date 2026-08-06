// ==========================================
// STUDENT LOGIN
// MAWADDAT-E-FIL-QURBA
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ==========================================
// FIREBASE CONFIG
// ==========================================

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


// ==========================================
// FIREBASE START
// ==========================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


// ==========================================
// HTML ELEMENTS
// ==========================================

const loginForm =
    document.getElementById("studentLoginForm");

const emailInput =
    document.getElementById("studentEmail");

const passwordInput =
    document.getElementById("studentPassword");

const message =
    document.getElementById("loginMessage");


// ==========================================
// STUDENT LOGIN
// ==========================================

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;


    if (!email || !password) {

        message.innerHTML =
            "Please enter your email and password.";

        message.style.color = "#6B1E1E";

        return;

    }


    message.innerHTML =
        "Logging in...";

    message.style.color = "#0F4C4C";


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
            "Student UID:",
            user.uid
        );


        message.innerHTML =
            "Login successful! Opening dashboard...";

        message.style.color =
            "#0F4C4C";


        setTimeout(() => {

            window.location.href =
                "student-dashboard.html";

        }, 700);


    }

    catch (error) {

        console.error(
            "Student Login Error:",
            error
        );


        message.innerHTML =
            "Invalid email or password.";

        message.style.color =
            "#6B1E1E";


        passwordInput.value = "";

    }

});
