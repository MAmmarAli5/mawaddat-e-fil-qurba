// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue
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

onValue(resultsRef, (snapshot) => {
const search = document.getElementById("search");

search.addEventListener("keyup", () => {

    let filter = search.value.toLowerCase();

    let rows = table.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {

        let firstCol = rows[i].getElementsByTagName("td")[0];

        if (firstCol) {

            let text = firstCol.textContent.toLowerCase();

            if (text.indexOf(filter) > -1) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }

        }

    }

});
    table.innerHTML = "";

    snapshot.forEach((childSnapshot) => {

        const data = childSnapshot.val();

        table.innerHTML += `
            <tr>
                <td>${data.studentName}</td>
                <td>${data.score} / ${data.total}</td>
                <td>${data.percentage}%</td>
                <td>${data.date}</td>
            </tr>
        `;

    });

});
