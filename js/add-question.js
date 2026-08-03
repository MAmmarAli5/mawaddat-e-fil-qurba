// ===============================
// FIREBASE IMPORTS
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ===============================
// HTML ELEMENTS
// ===============================

const question = document.getElementById("question");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");
const answer = document.getElementById("answer");
const saveBtn = document.getElementById("saveBtn");

// ===============================
// SAVE QUESTION
// ===============================

saveBtn.addEventListener("click", () => {

    if (
        question.value === "" ||
        option1.value === "" ||
        option2.value === "" ||
        option3.value === "" ||
        option4.value === "" ||
        answer.value === ""
    ) {

        alert("Please fill all fields.");
        return;

    }

    push(ref(db, "questions"), {

        question: question.value,

        options: [

            option1.value,
            option2.value,
            option3.value,
            option4.value

        ],

        answer: Number(answer.value)

    });

    alert("Question Saved Successfully!");

    question.value = "";
    option1.value = "";
    option2.value = "";
    option3.value = "";
    option4.value = "";
    answer.value = "";

});
