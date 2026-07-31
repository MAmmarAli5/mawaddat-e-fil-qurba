// ===============================
// ADMIN LOGIN PROTECTION
// ===============================

if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "admin-login.html";
}

// ===============================
// FIREBASE IMPORTS
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    onValue,
    remove,
    set
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
// HTML ELEMENTS
// ===============================

const table = document.getElementById("resultsTable");

const search = document.getElementById("search");

const logoutBtn = document.getElementById("logoutBtn");

const publishBtn = document.getElementById("publishBtn");

const topperName = document.getElementById("topperName");

const topperMarks = document.getElementById("topperMarks");

const totalStudentsBox = document.getElementById("totalStudents");

const averageMarksBox = document.getElementById("averageMarks");

const highestMarksBox = document.getElementById("highestMarks");

// ===============================
// DATABASE REFERENCES
// ===============================

const resultsRef = ref(db, "results");

const settingsRef = ref(db, "settings/resultsPublished");

// ===============================
// VARIABLES
// ===============================

let totalStudents = 0;

let totalScore = 0;

let highestScore = 0;

let highestTotal = 0;

let topper = "";
// ===============================
// LOAD RESULTS
// ===============================

onValue(resultsRef, (snapshot) => {

    table.innerHTML = "";

    totalStudents = 0;
    totalScore = 0;

    highestScore = 0;
    highestTotal = 0;

    topper = "";

    snapshot.forEach((childSnapshot) => {

        const data = childSnapshot.val();

        totalStudents++;

        totalScore += Number(data.score);

        if (Number(data.score) > highestScore) {

            highestScore = Number(data.score);

            highestTotal = Number(data.total);

            topper = data.studentName;

        }

        table.innerHTML += `

<tr>

<td>${data.studentName}</td>

<td>${data.score} / ${data.total}</td>

<td>${data.percentage}%</td>

<td>${data.date}</td>

<td>

<button
class="delete-btn"
onclick="deleteResult('${childSnapshot.key}')">

Delete

</button>

</td>

</tr>

`;

    });

    topperName.innerHTML = topper || "-";

    topperMarks.innerHTML =
        highestScore + " / " + highestTotal;

    totalStudentsBox.innerHTML = totalStudents;

    highestMarksBox.innerHTML =
        highestScore + " / " + highestTotal;

    if (totalStudents > 0) {

        averageMarksBox.innerHTML =
            (totalScore / totalStudents).toFixed(2);

    } else {

        averageMarksBox.innerHTML = "0";

    }

});

// ===============================
// LIVE SEARCH
// ===============================

search.addEventListener("keyup", () => {

    const filter = search.value.toLowerCase();

    const rows = table.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {

        const firstCol =
            rows[i].getElementsByTagName("td")[0];

        if (firstCol) {

            const text =
                firstCol.textContent.toLowerCase();

            rows[i].style.display =
                text.includes(filter)
                    ? ""
                    : "none";

        }

    }

});
