// ===============================
// FIREBASE IMPORTS
// ===============================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    push
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// ===============================
// FIREBASE CONFIG
// ===============================

const firebaseConfig = {
    apiKey: "AIzaSyB3FCQ0PFQaQDwdjIvvVd3shQ_EXqL3iMA",
    authDomain: "mawaddat-fil-qurba.firebaseapp.com",
    databaseURL: "https://mawaddat-fil-qurba-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mawaddat-fil-qurba",
    storageBucket: "mawaddat-fil-qurba.firebasestorage.app",
    messagingSenderId: "637175775327",
    appId: "1:637175775327:web:95da7d655c7606f5ef9bea"
};


// ===============================
// FIREBASE START
// ===============================

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


// ===============================
// FORM
// ===============================

const form = document.getElementById("questionForm");


// ===============================
// SAVE QUESTION
// ===============================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const question =
        document.getElementById("question").value.trim();

    const option1 =
        document.getElementById("option1").value.trim();

    const option2 =
        document.getElementById("option2").value.trim();

    const option3 =
        document.getElementById("option3").value.trim();

    const option4 =
        document.getElementById("option4").value.trim();

    const answer =
        Number(document.getElementById("answer").value);


    // ===========================
    // CHECK EMPTY FIELDS
    // ===========================

    if (
        question === "" ||
        option1 === "" ||
        option2 === "" ||
        option3 === "" ||
        option4 === ""
    ) {

        alert("Please fill all fields.");

        return;
    }


    // ===========================
    // CHECK ANSWER
    // ===========================

    if (answer < 0 || answer > 3) {

        alert("Please select a valid correct answer.");

        return;
    }


    // ===========================
    // QUESTION DATA
    // ===========================

    const questionData = {

        course: "Maarifat-e-Masoomin",

        session: 2,

        topic: "Imam Muhammad Baqir (ع)",

        marks: 1,

        question: question,

        options: [
            option1,
            option2,
            option3,
            option4
        ],

        answer: answer

    };


    // ===========================
    // SAVE
    // ===========================

    try {

        await push(
            ref(db, "questions"),
            questionData
        );

        alert(
            "✅ Question Added Successfully!"
        );

        form.reset();

    }

    catch (error) {

        console.error(
            "Firebase Error:",
            error
        );

        alert(
            "❌ Question was not saved.\n\n" +
            error.message
        );

    }

});
