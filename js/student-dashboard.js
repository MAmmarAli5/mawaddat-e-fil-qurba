// =====================================
// STUDENT DASHBOARD
// =====================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

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

const db = getDatabase(app);


// =====================================
// HTML ELEMENTS
// =====================================

const studentName =
    document.getElementById("studentName");

const infoName =
    document.getElementById("infoName");

const infoCourse =
    document.getElementById("infoCourse");

const infoBatch =
    document.getElementById("infoBatch");

const infoStatus =
    document.getElementById("infoStatus");

const courseTitle =
    document.getElementById("courseTitle");

const courseDescription =
    document.getElementById("courseDescription");

const latestUpdate =
    document.getElementById("latestUpdate");

const logoutBtn =
    document.getElementById("logoutBtn");

const classesBtn =
    document.getElementById("classesBtn");

const booksBtn =
    document.getElementById("booksBtn");

const examBtn =
    document.getElementById("examBtn");


// =====================================
// LOAD STUDENT
// =====================================

async function loadStudent(user) {

    try {

        const studentsRef =
            ref(db, "students");

        const snapshot =
            await get(studentsRef);


        if (!snapshot.exists()) {

            alert(
                "Student record not found."
            );

            return;

        }


        let student = null;


        snapshot.forEach((child) => {

            const data = child.val();


            // Match Firebase Auth UID

            if (
                data.uid &&
                data.uid === user.uid
            ) {

                student = {
                    id: child.key,
                    ...data
                };

            }

        });


        // =================================
        // STUDENT NOT FOUND
        // =================================

        if (!student) {

            alert(
                "Your student account is not linked with the student database."
            );

            return;

        }


        // =================================
        // DISPLAY INFORMATION
        // =================================

        const name =
            student.name || "Student";

        const course =
            student.course || "Not Assigned";

        const batch =
            student.batch || "2026";

        const status =
            student.status || "pending";


        studentName.innerText =
            name;

        infoName.innerText =
            name;

        infoCourse.innerText =
            course;

        infoBatch.innerText =
            batch;

        infoStatus.innerText =
            status;


        courseTitle.innerText =
            course;


        courseDescription.innerText =
            "You are enrolled in " +
            course +
            ". Your classes and learning material will appear here.";


        latestUpdate.innerText =
            "Current Session: " +
            course;


        // =================================
        // STATUS
        // =================================

        if (
            status.toLowerCase() !==
            "active"
        ) {

            infoStatus.style.color =
                "orange";


            classesBtn.disabled =
                true;

            booksBtn.disabled =
                true;

        }


        // =================================
        // SAVE COURSE LOCALLY
        // =================================

        localStorage.setItem(
            "studentName",
            name
        );

        localStorage.setItem(
            "studentCourse",
            course
        );

        localStorage.setItem(
            "studentBatch",
            batch
        );


        // =================================
        // COURSE BUTTONS
        // =================================

        classesBtn.addEventListener(
            "click",
            () => {

                window.location.href =
                    "classes.html";

            }
        );


        booksBtn.addEventListener(
            "click",
            () => {

                window.location.href =
                    "course-books.html";

            }
        );


        examBtn.addEventListener(
            "click",
            () => {

                window.location.href =
                    "exam.html";

            }
        );

    }

    catch (error) {

        console.error(error);

        alert(
            "Error loading student data."
        );

    }

}


// =====================================
// AUTH CHECK
// =====================================

onAuthStateChanged(
    auth,
    (user) => {

        if (!user) {

            window.location.href =
                "login.html";

            return;

        }


        loadStudent(user);

    }
);


// =====================================
// LOGOUT
// =====================================

logoutBtn.addEventListener(
    "click",
    async () => {

        try {

            await signOut(auth);

            localStorage.clear();

            window.location.href =
                "login.html";

        }

        catch (error) {

            console.error(error);

            alert(
                "Logout failed."
            );

        }

    }
);
