// ==========================================
// STUDENT DASHBOARD
// MAWADDAT-E-FIL-QURBA
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getDatabase,
    ref,
    get
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


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

const db = getDatabase(app);


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
// CHECK STUDENT LOGIN
// ==========================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href =
            "student-login.html";

        return;
    }


    // ======================================
    // STUDENT UID
    // ======================================

    const uid = user.uid;

    studentUID.textContent = uid;


    // ======================================
    // LOAD STUDENT PROFILE
    // ======================================

    try {

        const profileRef =
            ref(db, "students/" + uid);

        const snapshot =
            await get(profileRef);


        if (snapshot.exists()) {

            const student =
                snapshot.val();


            // Student name

            if (student.name) {

                studentName.textContent =
                    student.name;

            }


            console.log(
                "Student Profile:",
                student
            );

        }

        else {

            studentName.textContent =
                "Student";

            console.warn(
                "Student profile not found."
            );

        }

    }

    catch (error) {

        console.error(
            "Profile Loading Error:",
            error
        );

        studentName.textContent =
            "Student";

    }

});


// ==========================================
// LOGOUT
// ==========================================

logoutBtn.addEventListener(
    "click",
    async () => {

        const confirmLogout =
            confirm(
                "Do you want to logout?"
            );


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

    }
);
