// ===============================
// FIREBASE IMPORTS
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    onValue,
    remove
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

import { db } from "../firebase/config.js";
// ===============================
// HTML ELEMENTS
// ===============================

const table = document.getElementById("questionTable");
const search = document.getElementById("searchQuestion");

// ===============================
// LOAD QUESTIONS
// ===============================

const questionsRef = ref(db, "questions");

onValue(questionsRef, (snapshot) => {

    table.innerHTML = "";

    let count = 1;

    snapshot.forEach((childSnapshot) => {

        const data = childSnapshot.val();

        table.innerHTML += `

<tr>

<td>${count++}</td>

<td>${data.question}</td>

<td>${data.options[data.answer]}</td>

<td>

<button
class="delete-btn"
onclick="deleteQuestion('${childSnapshot.key}')">

Delete

</button>

</td>

</tr>

`;

    });

});

// ===============================
// SEARCH
// ===============================

search.addEventListener("keyup", () => {

    const filter = search.value.toLowerCase();

    const rows = table.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {

        const firstCol = rows[i].getElementsByTagName("td")[1];

        if (firstCol) {

            rows[i].style.display =
                firstCol.innerText.toLowerCase().includes(filter)
                ? ""
                : "none";

        }

    }

});

// ===============================
// DELETE QUESTION
// ===============================

window.deleteQuestion = function(id){

    if(confirm("Delete this Question?")){

        remove(ref(db,"questions/"+id));

        alert("Question Deleted Successfully.");

    }

};
