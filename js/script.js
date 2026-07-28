const quizContainer = document.getElementById("quiz-container");
const submitBtn = document.getElementById("submit-btn");
const studentName = document.getElementById("student-name");
const resultBox = document.getElementById("result");


// Questions load کرنا
function loadQuestions() {

    questions.forEach((q, index) => {

        let questionHTML = `
        <div class="question-box">

            <h3>${q.question}</h3>

            <label>
            <input type="radio" name="q${index}" value="${q.options[0]}">
            ${q.options[0]}
            </label>

            <label>
            <input type="radio" name="q${index}" value="${q.options[1]}">
            ${q.options[1]}
            </label>

            <label>
            <input type="radio" name="q${index}" value="${q.options[2]}">
            ${q.options[2]}
            </label>

            <label>
            <input type="radio" name="q${index}" value="${q.options[3]}">
            ${q.options[3]}
            </label>

        </div>
        `;

        quizContainer.innerHTML += questionHTML;

    });

}


// Result check کرنا
submitBtn.addEventListener("click", function(){

    let score = 0;

    questions.forEach((q,index)=>{

        let selected = document.querySelector(
            `input[name="q${index}"]:checked`
        );


        if(selected && selected.value === q.answer){

            score++;

        }

    });


    let percentage = (score / questions.length) * 100;


    resultBox.innerHTML = `

    <h2>Result</h2>

    <p>Student Name: ${studentName.value}</p>

    <p>Total Marks: ${score} / 60</p>

    <p>Percentage: ${percentage.toFixed(2)}%</p>

    `;


});


// Start Quiz
loadQuestions();
