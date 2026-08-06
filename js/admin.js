// ===============================
// ADMIN LOGIN PROTECTION
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "admin-login.html";
        return;
    }

    console.log("Admin authenticated:", user.email);

});
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
import { db } from "../firebase/config.js";
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
const excelBtn = document.getElementById("excelBtn");
const pdfBtn = document.getElementById("pdfBtn");
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
// ===============================
// DELETE RESULT
// ===============================

window.deleteResult = function(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student's result?"
    );

    if (!confirmDelete) return;

    remove(ref(db, "results/" + id))
        .then(() => {

            alert("Result Deleted Successfully.");

        })
        .catch((error) => {

            alert("Error : " + error.message);

        });

};

// ===============================
// PUBLISH RESULTS
// ===============================

publishBtn.addEventListener("click", async () => {

    try {

        await set(settingsRef, true);

        alert("Results Published Successfully.");

    }
    catch (error) {

        alert(error.message);

    }

});

// ===============================
// LOGOUT
// ===============================

logoutBtn.addEventListener("click", () => {

    const logout = confirm("Do you want to Logout?");

    signOut(auth)
    .then(() => {
        window.location.href = "admin-login.html";
    })
    .catch((error) => {
        alert("Logout Error: " + error.message);
    });
// ===============================
// CHECK RESULT STATUS
// ===============================

onValue(settingsRef, (snapshot) => {

    if (snapshot.exists()) {

        const published = snapshot.val();

        if (published) {

            publishBtn.innerHTML = "✅ Results Published";
            publishBtn.disabled = true;

        } else {

            publishBtn.innerHTML = "Publish Results";
            publishBtn.disabled = false;

        }

    }

});

// ===============================
// AUTO REFRESH TABLE
// ===============================

setInterval(() => {

    onValue(resultsRef, () => {});

}, 10000);

// ===============================
// CONSOLE MESSAGE
// ===============================

console.log("✅ Admin Panel Loaded Successfully");
excelBtn.addEventListener("click", () => {

    let wb = XLSX.utils.book_new();

    let ws_data = [
        ["Student Name", "Marks", "Percentage", "Date"]
    ];

    const rows = table.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {

        let cols = rows[i].getElementsByTagName("td");

        if (cols.length > 0) {

            ws_data.push([
                cols[0].innerText,
                cols[1].innerText,
                cols[2].innerText,
                cols[3].innerText
            ]);

        }

    }

    let ws = XLSX.utils.aoa_to_sheet(ws_data);

    XLSX.utils.book_append_sheet(wb, ws, "Results");

    XLSX.writeFile(wb, "Exam_Results.xlsx");

});
// ===============================
// EXPORT RESULTS TO PDF
// ===============================

pdfBtn.addEventListener("click", () => {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Mawaddat-e-Fil-Qurba", 20, 20);

    doc.setFontSize(14);
    doc.text("Exam Results", 20, 30);

    let y = 45;

    doc.setFontSize(11);

    doc.text("Student", 20, y);
    doc.text("Marks", 90, y);
    doc.text("%", 130, y);
    doc.text("Date", 150, y);

    y += 8;

    const rows = table.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {

        const cols = rows[i].getElementsByTagName("td");

        if (cols.length > 0) {

            doc.text(cols[0].innerText, 20, y);
            doc.text(cols[1].innerText, 90, y);
            doc.text(cols[2].innerText, 130, y);
            doc.text(cols[3].innerText, 150, y);

            y += 8;

            // نئی Page اگر جگہ ختم ہو جائے
            if (y > 270) {

                doc.addPage();
                y = 20;

            }
        }
    }

    doc.save("Exam_Results.pdf");

});
