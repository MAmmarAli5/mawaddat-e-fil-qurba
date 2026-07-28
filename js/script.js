const quizContainer = document.getElementById("quiz-container");
const submitBtn = document.getElementById("submit-btn");
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

submitBtn.addEventListener("click",()=>{


let score = 0;


questions.forEach((q,index)=>{


let answer = document.querySelector(
`input[name="q${index}"]:checked`
);


if(answer && answer.value === q.answer){

score++;

}


});


let percentage = (score/questions.length)*100;


let name = localStorage.getItem("studentName");


resultBox.innerHTML = `

<h2>Result</h2>

<p>Student Name: ${name}</p>

<p>Total Marks: ${score} / ${questions.length}</p>

<p>Percentage: ${percentage.toFixed(2)}%</p>

`;


});



// Start

loadQuestions();
