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
    date: new Date().toLocaleString(),
     submittedAt: Date.now()
});

});
// ===== Exam Timer =====

let totalTime = 4 * 60 * 60 + 45 * 60; // 4h 45m

const timer = document.getElementById("timer");

const examTimer = setInterval(() => {

    let hours = Math.floor(totalTime / 3600);

    let minutes = Math.floor((totalTime % 3600) / 60);

    let seconds = totalTime % 60;

    timer.innerHTML =
    `⏳ Time Left :
    ${String(hours).padStart(2,'0')} :
    ${String(minutes).padStart(2,'0')} :
    ${String(seconds).padStart(2,'0')}`;

    totalTime--;

    if(totalTime < 0){

        clearInterval(examTimer);

        alert("Time is over! Exam Submitted.");

        submitBtn.click();

    }

},1000);
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
document.addEventListener("contextmenu",(e)=>{

e.preventDefault();

});
let warning = 0;

document.addEventListener("visibilitychange",()=>{

if(document.hidden){

warning++;

alert("Warning! Do not leave the Exam.");

if(warning>=3){

alert("Exam Submitted due to cheating.");

submitBtn.click();

}

}

});
// =========================
// FULL SCREEN MODE
// =========================

window.addEventListener("load", () => {

    document.documentElement.requestFullscreen().catch(() => {

        alert("Please allow Full Screen Mode to start the exam.");

    });

});
// =========================
// EXIT FULL SCREEN DETECTION
// =========================

let fullscreenWarning = 0;

document.addEventListener("fullscreenchange", () => {

    if (!document.fullscreenElement) {

        fullscreenWarning++;

        alert("Warning! You exited Full Screen.");

        if (fullscreenWarning >= 3) {

            alert("Exam Submitted due to cheating.");

            submitBtn.click();

        }

    }

});
// =========================
// BLOCK SHORTCUT KEYS
// =========================

document.addEventListener("keydown", function(e){

    // F12
    if(e.key === "F12"){
        e.preventDefault();
    }

    // Ctrl+Shift+I / J / C
    if(e.ctrlKey && e.shiftKey &&
      (e.key === "I" || e.key === "J" || e.key === "C")){
        e.preventDefault();
    }

    // Ctrl+U
    if(e.ctrlKey && e.key === "u"){
        e.preventDefault();
    }

    // Ctrl+S
    if(e.ctrlKey && e.key === "s"){
        e.preventDefault();
    }

});
// =========================
// BLOCK SHORTCUT KEYS
// =========================

document.addEventListener("keydown", function(e){

    // F12
    if(e.key === "F12"){
        e.preventDefault();
    }

    // Ctrl+Shift+I / J / C
    if(e.ctrlKey && e.shiftKey &&
      (e.key === "I" || e.key === "J" || e.key === "C")){
        e.preventDefault();
    }

    // Ctrl+U
    if(e.ctrlKey && e.key === "u"){
        e.preventDefault();
    }

    // Ctrl+S
    if(e.ctrlKey && e.key === "s"){
        e.preventDefault();
    }

});
