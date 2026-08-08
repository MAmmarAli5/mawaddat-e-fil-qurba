// =====================================
// FIREBASE LOGIN
// =====================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// =====================================
// FIREBASE CONFIG
// =====================================

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


// =====================================
// INITIALIZE FIREBASE
// =====================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


// =====================================
// HTML ELEMENTS
// =====================================

const loginForm =
    document.getElementById("loginForm");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const loginMessage =
    document.getElementById("loginMessage");


// =====================================
// ADMIN UID
// =====================================

const ADMIN_UID =
    "OE0IbtLPAoX9ajtlZtSorC6U3o33";


// =====================================
// LOGIN
// =====================================

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;


    loginMessage.innerHTML =
        "⏳ Logging in...";


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
            "Logged in UID:",
            user.uid
        );


        // =================================
        // ADMIN
        // =================================

        if (user.uid === ADMIN_UID) {

            loginMessage.innerHTML =
                "✅ Admin Login Successful";

            setTimeout(() => {

               window.location.href =
    "../admin.html";

            }, 800);

            return;
        }


        // =================================
        // STUDENT
        // =================================

        loginMessage.innerHTML =
            "✅ Login Successful";


        setTimeout(() => {

            window.location.href =
                "student-dashboard.html";

        }, 800);


    }

    catch (error) {

        console.error(error);


        loginMessage.innerHTML =
            "❌ Invalid Email or Password";


        if (
            error.code ===
            "auth/invalid-credential"
        ) {

            loginMessage.innerHTML =
                "❌ Email or Password is incorrect.";

        }

    }

});
