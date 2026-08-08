// =====================================================
// MAWADDAT-E-FIL-QURBA
// HOME PAGE APP.JS
// =====================================================


// =====================================================
// FIREBASE IMPORTS
// =====================================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    get
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


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
// INITIALIZE FIREBASE
// =====================================================

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


// =====================================================
// HTML ELEMENTS
// =====================================================

const currentCourseName =
    document.getElementById("currentCourseName");

const currentBatch =
    document.getElementById("currentBatch");

const currentSession =
    document.getElementById("currentSession");

const currentTopic =
    document.getElementById("currentTopic");


const latestUpdateTitle =
    document.getElementById("latestUpdateTitle");

const latestCourse =
    document.getElementById("latestCourse");

const latestBatch =
    document.getElementById("latestBatch");

const latestSession =
    document.getElementById("latestSession");

const latestTopic =
    document.getElementById("latestTopic");


// =====================================================
// DEFAULT SESSION
// =====================================================

const defaultSession = {

    courseName:
        "معرفتِ معصومین",

    batch:
        "2026",

    session:
        "Session No. 2",

    topic:
        "Imam Muhammad Baqir (A.S.)"

};


// =====================================================
// UPDATE SESSION ON HOME PAGE
// =====================================================

function updateSession(data) {


    if (!data) {

        data = defaultSession;

    }


    // CURRENT SESSION

    if (currentCourseName) {

        currentCourseName.textContent =
            data.courseName ||
            defaultSession.courseName;

    }


    if (currentBatch) {

        currentBatch.textContent =
            data.batch ||
            defaultSession.batch;

    }


    if (currentSession) {

        currentSession.textContent =
            data.session ||
            defaultSession.session;

    }


    if (currentTopic) {

        currentTopic.textContent =
            data.topic ||
            defaultSession.topic;

    }


    // LATEST UPDATE

    if (latestUpdateTitle) {

        latestUpdateTitle.textContent =
            data.courseName ||
            defaultSession.courseName;

    }


    if (latestCourse) {

        latestCourse.textContent =
            data.courseName ||
            defaultSession.courseName;

    }


    if (latestBatch) {

        latestBatch.textContent =
            data.batch ||
            defaultSession.batch;

    }


    if (latestSession) {

        latestSession.textContent =
            data.session ||
            defaultSession.session;

    }


    if (latestTopic) {

        latestTopic.textContent =
            data.topic ||
            defaultSession.topic;

    }

}


// =====================================================
// GET PAKISTAN DATE & TIME
// =====================================================

function getPakistanDateTime() {

    const now = new Date();

    const formatter =
        new Intl.DateTimeFormat(
            "en-CA",
            {
                timeZone: "Asia/Karachi",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            }
        );


    const parts =
        formatter.formatToParts(now);


    const values = {};


    parts.forEach(part => {

        if (part.type !== "literal") {

            values[part.type] =
                part.value;

        }

    });


    return {

        year:
            Number(values.year),

        month:
            Number(values.month),

        day:
            Number(values.day),

        hour:
            Number(values.hour),

        minute:
            Number(values.minute),

        second:
            Number(values.second)

    };

}


// =====================================================
// CHECK AUTOMATIC SESSION CHANGE
// =====================================================
//
// Exam:
// 15 August 2026
//
// Result:
// 16 August 2026 at 7:00 PM
//
// After result publication:
// Session 3
// Imam Ja'far Sadiq (A.S.)
// =====================================================

function checkAutomaticSession() {


    const time =
        getPakistanDateTime();


    const examEndDate =
        new Date(
            "2026-08-16T19:00:00+05:00"
        );


    const now =
        new Date();


    // -------------------------------------------------
    // BEFORE RESULT PUBLICATION
    // -------------------------------------------------

    if (now < examEndDate) {

        updateSession(defaultSession);

        return;

    }


    // -------------------------------------------------
    // AFTER RESULT PUBLICATION
    // SESSION 3
    // -------------------------------------------------

    const session3 = {

        courseName:
            "معرفتِ معصومین",

        batch:
            "2026",

        session:
            "Session No. 3",

        topic:
            "Imam Ja'far Sadiq (A.S.)"

    };


    updateSession(session3);

}


// =====================================================
// LOAD SESSION FROM FIREBASE
// =====================================================

async function loadSessionFromFirebase() {


    try {

        const sessionRef =
            ref(db, "settings/currentSession");


        const snapshot =
            await get(sessionRef);


        if (snapshot.exists()) {

            const data =
                snapshot.val();


            updateSession(data);


        }

        else {

            checkAutomaticSession();

        }

    }

    catch (error) {

        console.error(
            "Session loading error:",
            error
        );


        // اگر Firebase سے معلومات نہ آئیں
        // تو automatic schedule استعمال ہوگا

        checkAutomaticSession();

    }

}


// =====================================================
// LOAD LATEST UPDATE
// =====================================================

async function loadLatestUpdate() {


    try {

        const updateRef =
            ref(db, "settings/latestUpdate");


        const snapshot =
            await get(updateRef);


        if (!snapshot.exists()) {

            return;

        }


        const data =
            snapshot.val();


        if (data.title &&
            latestUpdateTitle) {

            latestUpdateTitle.textContent =
                data.title;

        }


        if (data.course &&
            latestCourse) {

            latestCourse.textContent =
                data.course;

        }


        if (data.batch &&
            latestBatch) {

            latestBatch.textContent =
                data.batch;

        }


        if (data.session &&
            latestSession) {

            latestSession.textContent =
                data.session;

        }


        if (data.topic &&
            latestTopic) {

            latestTopic.textContent =
                data.topic;

        }

    }

    catch (error) {

        console.error(
            "Latest update error:",
            error
        );

    }

}


// =====================================================
// START
// =====================================================

updateSession(defaultSession);

loadSessionFromFirebase();

loadLatestUpdate();


// =====================================================
// CHECK EVERY MINUTE
// =====================================================

setInterval(() => {

    checkAutomaticSession();

}, 60000);


// =====================================================
// CONSOLE
// =====================================================

console.log(
    "✅ Mawaddat-e-Fil-Qurba Home Page Loaded"
);
