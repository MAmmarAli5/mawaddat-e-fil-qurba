// =====================================================
// UNIVERSAL LOGIN
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
// INITIALIZE
// =====================================================

const app =
    initializeApp(firebaseConfig);

const auth =
    getAuth(app);


// =====================================================
// ELEMENTS
// =====================================================

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

const studentMode =
    document.getElementById("studentMode");

const adminMode =
    document.getElementById("adminMode");

const forgotPassword =
    document.getElementById("forgotPassword");

const studentLinks =
    document.getElementById("studentLinks");


// =====================================================
// CURRENT LOGIN MODE
// =====================================================

let loginMode = "student";


// =====================================================
// STUDENT MODE
// =====================================================

studentMode.addEventListener(
    "click",
    () => {

        loginMode = "student";


        studentMode.classList.add(
            "active"
        );

        adminMode.classList.remove(
            "active"
        );


        loginBtn.textContent =
            "Student Login";


        studentLinks.style.display =
            "block";


        clearMessage();

    }
);


// =====================================================
// ADMIN MODE
// =====================================================

adminMode.addEventListener(
    "click",
    () => {

        loginMode = "admin";


        adminMode.classList.add(
            "active"
        );

        studentMode.classList.remove(
            "active"
        );


        loginBtn.textContent =
            "Admin Login";


        studentLinks.style.display =
            "none";


        clearMessage();

    }
);


// =====================================================
// LOGIN
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

            showError(
                "براہِ کرم Email اور Password درج کریں۔"
            );

            return;

        }


        loginBtn.disabled =
            true;

        loginBtn.textContent =
            "Logging in...";


        try {


            const userCredential =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            const user =
                userCredential.user;


            // =================================================
            // STUDENT LOGIN
            // =================================================

            if (
                loginMode ===
                "student"
            ) {


                localStorage.setItem(
                    "studentUID",
                    user.uid
                );


                localStorage.setItem(
                    "studentEmail",
                    user.email
                );


                showSuccess(
                    "Login کامیاب۔ Dashboard کھولا جا رہا ہے..."
                );


                setTimeout(
                    () => {

                        window.location.href =
                            "student-dashboard.html";

                    },
                    700
                );


                return;

            }


            // =================================================
            // ADMIN LOGIN
            // =================================================

            if (
                loginMode ===
                "admin"
            ) {


                showSuccess(
                    "Admin Login کامیاب۔ Admin Panel کھولا جا رہا ہے..."
                );


                setTimeout(
                    () => {

                        window.location.href =
                            "../admin.html";

                    },
                    700
                );


            }

        }


        catch (error) {


            console.error(
                "Login Error:",
                error
            );


            loginBtn.disabled =
                false;


            loginBtn.textContent =
                loginMode === "admin"
                    ? "Admin Login"
                    : "Student Login";


            if (
                error.code ===
                "auth/invalid-credential"
            ) {

                showError(
                    "Email یا Password درست نہیں ہے۔"
                );

            }

            else if (
                error.code ===
                "auth/user-disabled"
            ) {

                showError(
                    "یہ اکاؤنٹ غیر فعال کر دیا گیا ہے۔"
                );

            }

            else if (
                error.code ===
                "auth/invalid-email"
            ) {

                showError(
                    "براہِ کرم درست Email درج کریں۔"
                );

            }

            else {

                showError(
                    "Login نہیں ہو سکا۔ دوبارہ کوشش کریں۔"
                );

            }

        }

    }
);


// =====================================================
// FORGOT PASSWORD
// =====================================================

forgotPassword.addEventListener(
    "click",
    async () => {


        const email =
            emailInput.value.trim();


        if (!email) {

            showError(
                "پہلے Email Address درج کریں۔"
            );

            emailInput.focus();

            return;

        }


        try {


            await sendPasswordResetEmail(
                auth,
                email
            );


            showSuccess(
                "Password Reset Email بھیج دی گئی ہے۔ اپنا Email Inbox چیک کریں۔"
            );


        }

        catch (error) {


            console.error(
                error
            );


            showError(
                "Password Reset Email نہیں بھیجی جا سکی۔ Email چیک کریں۔"
            );

        }

    }
);


// =====================================================
// MESSAGE FUNCTIONS
// =====================================================

function showError(text) {

    message.textContent =
        text;

    message.className =
        "message error";

}


function showSuccess(text) {

    message.textContent =
        text;

    message.className =
        "message success";

}


function clearMessage() {

    message.textContent =
        "";

    message.className =
        "message";

}
