// ==========================================
// STUDENT DASHBOARD
// MAWADDAT-E-FIL-QURBA
// ==========================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ==========================================
// FIREBASE CONFIG
// ==========================================

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


// ==========================================
// FIREBASE START
// ==========================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


// ==========================================
// HTML ELEMENTS
// ==========================================

const studentName =
    document.getElementById("studentName");

const studentUID =
    document.getElementById("studentUID");

const logoutBtn =
    document.getElementById("logoutBtn");


// ==========================================
// CHECK AUTHENTICATION
// ==========================================

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href =
            "student-login.html";

        return;
    }


    // ======================================
    // STUDENT INFORMATION
    // ======================================

    const uid = user.uid;

    const email = user.email || "Student";


    studentUID.textContent = uid;

    /*
       Temporary display:

       We will later replace this
       with the student's actual name
       stored in Realtime Database.
    */

    studentName.textContent =
        email.split("@")[0];


    console.log(
        "Student authenticated:",
        uid
    );

});


// ==========================================
// LOGOUT
// ==========================================

logoutBtn.addEventListener("click", async () => {

    const confirmLogout =
        confirm("Do you want to logout?");

    if (!confirmLogout) return;


    try {

        await signOut(auth);

        window.location.href =
            "student-login.html";

    }

    catch (error) {

        console.error(
            "Logout Error:",
            error
        );

        alert(
            "Unable to logout. Please try again."
        );

    }

});
