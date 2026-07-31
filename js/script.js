// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const quizContainer = document.getElementById("quiz-container");
const submitBtn = document.getElementById("submitBtn");
const resultBox = document.getElementById("result");


// سوالات دکھانے کا فنکشن

function loadQuestions(){

    questions.forEach((q,index)=>{

        let html = `

        <div class="question">

        <h3>
        ${index + 1}. ${q.question}
        </h3>


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



// Result check
submitBtn.addEventListener("click", () => {

    let score = 0;

    questions.forEach((q, index) => {

        let answer = document.querySelector(
            `input[name="q${index}"]:checked`
        );

        if (answer) {

            let selectedIndex = q.options.indexOf(answer.value);

            if (selectedIndex === q.answer) {
                score++;
            }

        }

    }); // ← صرف forEach یہاں ختم ہوگی

    let percentage = (score / questions.length) * 100;

    let name = localStorage.getItem("studentName");

    resultBox.innerHTML = `
        <h2>Result</h2>
        <p>Student Name: ${name}</p>
        <p>Total Marks: ${score} / ${questions.length}</p>
        <p>Percentage: ${percentage.toFixed(2)}%</p>
    `;

    const examRef = ref(db, "results");

   push(examRef, {
    studentName: name,
    score: score,
    total: questions.length,
    percentage: percentage.toFixed(2),
    date: new Date().toLocaleString()
});

});

// Start
loadQuestions();
let warningCount = 0;

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        warningCount++;

        alert("Warning! You left the exam page.");

        if (warningCount >= 3) {

            alert("Exam has been submitted due to cheating.");

            submitBtn.click();

        }

    }

});
document.addEventListener("contextmenu", function(e){
    e.preventDefault();
});
document.addEventListener("copy", function(e){
    e.preventDefault();
});
document.addEventListener("paste", function(e){
    e.preventDefault();
});
