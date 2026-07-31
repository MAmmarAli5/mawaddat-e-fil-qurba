// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    get
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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const searchBtn = document.getElementById("searchBtn");
const resultBox = document.getElementById("resultBox");

searchBtn.addEventListener("click", async () => {

    const studentName = document
        .getElementById("studentSearch")
        .value
        .trim()
        .toLowerCase();

    if (studentName === "") {

        alert("Please enter student name.");
        return;

    }

    const snapshot = await get(ref(db, "results"));

    let found = false;

    resultBox.innerHTML = "";

    snapshot.forEach((child) => {

        const data = child.val();

        if (data.studentName.toLowerCase() === studentName) {

            found = true;
          const after24Hours = data.submittedAt + (24 * 60 * 60 * 1000);

if (Date.now() < after24Hours) {

    resultBox.innerHTML = `
        <h2>Result Not Published</h2>

        <p>Your result will be available after 24 hours.</p>
    `;

    return;
}
            resultBox.innerHTML = `
                <h2>Student Result</h2>

                <p><strong>Name:</strong> ${data.studentName}</p>

                <p><strong>Marks:</strong>
                ${data.score} / ${data.total}</p>

                <p><strong>Percentage:</strong>
                ${data.percentage}%</p>

                <p><strong>Date:</strong>
                ${data.date}</p>
            `;

        }

    });

    if (!found) {

        resultBox.innerHTML =
        "<h2>Student not found.</h2>";

    }

});
