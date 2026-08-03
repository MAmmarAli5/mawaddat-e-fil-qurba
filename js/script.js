// ===============================
// FIREBASE IMPORTS
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    get,
    push
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyB3FCQ0PFQaQDwdjIvvVd3shQ_EXqL3iMA",
  authDomain: "mawaddat-fil-qurba.firebaseapp.com",
  databaseURL: "https://mawaddat-fil-qurba-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mawaddat-fil-qurba",
  storageBucket: "mawaddat-fil-qurba.firebasestorage.app",
  messagingSenderId: "637175775327",
  appId: "1:637175775327:web:95da7d655c7606f5ef9bea"
};
// اپنی اصل Firebase Config یہاں پیسٹ کریں

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ===============================
// HTML ELEMENTS
// ===============================

const quizContainer = document.getElementById("quiz-container");
const submitBtn = document.getElementById("submitBtn");
const resultBox = document.getElementById("result");

// ===============================
// VARIABLES
// ===============================

let questions = [];

// ===============================
// LOAD QUESTIONS FROM FIREBASE
// ===============================

async function loadQuestions() {

    quizContainer.innerHTML = "<h3>Loading Questions...</h3>";

    try {

        const snapshot = await get(ref(db, "questions"));

        if (!snapshot.exists()) {

            quizContainer.innerHTML =
                "<h3>No Questions Found.</h3>";

            return;

        }

        questions = [];

        snapshot.forEach((child) => {

            questions.push(child.val());

        });

        quizContainer.innerHTML = "";

        displayQuestions();

    }

    catch (error) {

        console.error(error);

        quizContainer.innerHTML =
            "<h3>Error Loading Questions.</h3>";

    }

}
// ===============================
// DISPLAY QUESTIONS
// ===============================

function displayQuestions() {

    questions.forEach((q, index) => {

        let html = `

        <div class="question">

            <h3>${index + 1}. ${q.question}</h3>

            <label>
                <input type="radio" name="q${index}" value="${q.options[0]}">
                ${q.options[0]}
            </label>
            <br>

            <label>
                <input type="radio" name="q${index}" value="${q.options[1]}">
                ${q.options[1]}
            </label>
            <br>

            <label>
                <input type="radio" name="q${index}" value="${q.options[2]}">
                ${q.options[2]}
            </label>
            <br>

            <label>
                <input type="radio" name="q${index}" value="${q.options[3]}">
                ${q.options[3]}
            </label>

        </div>

        `;

        quizContainer.innerHTML += html;

    });

}
loadQuestions();
