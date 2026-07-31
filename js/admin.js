// Firebase SDK
if (localStorage.getItem("adminLoggedIn") !== "true") {

    window.location.href = "admin-login.html";

}
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  remove
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

const table = document.getElementById("resultsTable");

const resultsRef = ref(db, "results");
search.addEventListener("keyup", () => {

    let filter = search.value.toLowerCase();

    let rows = table.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {

        let firstCol = rows[i].getElementsByTagName("td")[0];

        if (firstCol) {

            let text = firstCol.textContent.toLowerCase();

            rows[i].style.display =
                text.includes(filter) ? "" : "none";
        }
    }

});
let topperName = "";
let topperScore = -1;
let topperTotal = 0;
let totalStudents = 0;
let totalScore = 0;
onValue(resultsRef, (snapshot) => {

    table.innerHTML = "";

    let topperName = "";
    let topperScore = -1;
    let topperTotal = 0;

    snapshot.forEach((childSnapshot) => {
        totalStudents++;
        totalScore += data.score;
        const data = childSnapshot.val();
document.getElementById("totalStudents").innerHTML = totalStudents;
document.getElementById("highestMarks").innerHTML = `${topperScore} / ${topperTotal}`;
let average = (totalScore / totalStudents).toFixed(2);
document.getElementById("averageMarks").innerHTML = average;
        if (data.score > topperScore) {
            topperScore = data.score;
            topperTotal = data.total;
            topperName = data.studentName;
        }

        table.innerHTML += `
<tr>
    <td>${data.studentName}</td>
    <td>${data.score} / ${data.total}</td>
    <td>${data.percentage}%</td>
    <td>${data.date}</td>
    <td>
        <button onclick="deleteResult('${childSnapshot.key}')">
            Delete
        </button>
    </td>
</tr>
`;
        `;

    });

    document.getElementById("topperName").innerHTML = topperName;
    document.getElementById("topperMarks").innerHTML =
        `${topperScore} / ${topperTotal}`;

});
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("adminLoggedIn");

    window.location.href = "admin-login.html";

});
