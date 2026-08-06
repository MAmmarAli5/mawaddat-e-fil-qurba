// ===============================
// FIREBASE IMPORTS
// ===============================
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


// ===============================
// FIREBASE START
// ===============================

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


// ===============================
// HTML ELEMENTS
// ===============================

const form =
    document.getElementById("questionForm");

const question =
    document.getElementById("question");

const option1 =
    document.getElementById("option1");

const option2 =
    document.getElementById("option2");

const option3 =
    document.getElementById("option3");

const option4 =
    document.getElementById("option4");

const answer =
    document.getElementById("answer");


// ===============================
// SAVE QUESTION
// ===============================

form.addEventListener("submit", async (e) => {

    e.preventDefault();


    // ===========================
    // GET VALUES
    // ===========================

    const questionText =
        question.value.trim();

    const op1 =
        option1.value.trim();

    const op2 =
        option2.value.trim();

    const op3 =
        option3.value.trim();

    const op4 =
        option4.value.trim();

    const correctAnswer =
        Number(answer.value);


    // ===========================
    // VALIDATION
    // ===========================

    if (
        questionText === "" ||
        op1 === "" ||
        op2 === "" ||
        op3 === "" ||
        op4 === "" ||
        answer.value === ""
    ) {

        alert("Please fill all fields.");

        return;
    }


    // ===========================
    // ANSWER VALIDATION
    // ===========================

    if (
        correctAnswer < 1 ||
        correctAnswer > 4
    ) {

        alert(
            "Correct answer must be 1, 2, 3 or 4."
        );

        return;
    }


    // ===========================
    // QUESTION DATA
    // ===========================

    const questionData = {

        course:
            "Maarifat-e-Masoomin",

        session:
            2,

        topic:
            "Imam Muhammad Baqir (ع)",

        marks:
            1,

        question:
            questionText,

        options: [

            op1,
            op2,
            op3,
            op4

        ],

        answer:
            correctAnswer

    };


    // ===========================
    // SAVE TO FIREBASE
    // ===========================

    try {

        await push(
            ref(db, "questions"),
            questionData
        );


        alert(
            "✅ Question Added Successfully!"
        );


        // =======================
        // CLEAR FORM
        // =======================

        form.reset();


    }

    catch (error) {

        console.error(
            "Firebase Error:",
            error
        );

        alert(
            "❌ Question could not be saved.\n\n" +
            error.message
        );

    }

});
