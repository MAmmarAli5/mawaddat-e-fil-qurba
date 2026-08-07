// ======================================================
// MAWADDAT-E-FIL-QURBA
// MAARIFAT-E-MASOOMIN - SESSION 2
// ONLINE EXAM SYSTEM
// ======================================================

import {
    getDatabase,
    ref,
    get,
    push
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// ======================================================
// FIREBASE DATABASE
// ======================================================

const db = getDatabase();


// ======================================================
// HTML ELEMENTS
// ======================================================

const quizContainer =
    document.getElementById("quiz-container");

const submitBtn =
    document.getElementById("submitBtn");

const resultBox =
    document.getElementById("result");

const timerElement =
    document.getElementById("timer");

const examStatus =
    document.getElementById("examStatus");


// ======================================================
// EXAM SETTINGS
// ======================================================

// پاکستان کا وقت UTC+5

const EXAM_START =
    new Date("2026-08-10T19:00:00+05:00").getTime();

const EXAM_END =
    new Date("2026-08-10T23:00:00+05:00").getTime();

const RESULT_PUBLISH_TIME =
    new Date("2026-08-11T19:00:00+05:00").getTime();


// طالب علم کو زیادہ سے زیادہ 2 گھنٹے

const EXAM_DURATION =
    2 * 60 * 60 * 1000;


// ======================================================
// VARIABLES
// ======================================================

let questions = [];

let serverTimeOffset = 0;

let examStarted = false;

let examSubmitted = false;

let timerInterval = null;

let examStartTime = null;

let examDeadline = null;


// ======================================================
// STUDENT NAME
// ======================================================

const studentName =
    localStorage.getItem("studentName") || "Unknown";

const displayName =
    document.getElementById("display-name");

if (displayName) {

    displayName.textContent =
        "طالب علم: " + studentName;

}


// ======================================================
// SERVER TIME
// ======================================================

async function getServerTime() {

    try {

        const snapshot =
            await get(
                ref(db, ".info/serverTimeOffset")
            );

        serverTimeOffset =
            snapshot.val() || 0;

    }

    catch (error) {

        console.error(
            "Server time error:",
            error
        );

        serverTimeOffset = 0;

    }

}


// موجودہ اندازاً سرور وقت

function getServerNow() {

    return Date.now() + serverTimeOffset;

}


// ======================================================
// EXAM STATUS
// ======================================================

function showExamStatus(message) {

    if (examStatus) {

        examStatus.textContent =
            message;

    }

}


// ======================================================
// TIMER DISPLAY
// ======================================================

function formatTime(milliseconds) {

    if (milliseconds <= 0) {

        return "00:00:00";

    }

    const totalSeconds =
        Math.floor(milliseconds / 1000);

    const hours =
        Math.floor(totalSeconds / 3600);

    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );

    const seconds =
        totalSeconds % 60;


    return (

        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0")

    );

}


// ======================================================
// UPDATE TIMER
// ======================================================

function updateTimer() {

    if (!examStarted || examSubmitted) {

        return;

    }


    const now =
        getServerNow();


    const remaining =
        examDeadline - now;


    if (remaining <= 0) {

        clearInterval(timerInterval);

        timerElement.textContent =
            "00:00:00";

        autoSubmitExam();

        return;

    }


    timerElement.textContent =
        formatTime(remaining);

}


// ======================================================
// START TIMER
// ======================================================

function startExamTimer() {

    examStarted = true;


    const now =
        getServerNow();


    examStartTime = now;


    // اگر دو گھنٹے 11 بجے سے آگے جائیں
    // تو امتحان 11 بجے ہی ختم ہوگا

    examDeadline =
        Math.min(
            now + EXAM_DURATION,
            EXAM_END
        );


    // صفحہ Refresh ہونے کی صورت میں
    // وقت دوبارہ صفر سے شروع نہ ہو

    localStorage.setItem(
        "maarifatSession2ExamStart",
        String(examStartTime)
    );


    localStorage.setItem(
        "maarifatSession2ExamDeadline",
        String(examDeadline)
    );


    showExamStatus(
        "امتحان جاری ہے۔ براہِ کرم مقررہ وقت میں مکمل کریں۔"
    );


    submitBtn.disabled = false;


    updateTimer();


    timerInterval =
        setInterval(
            updateTimer,
            1000
        );

}


// ======================================================
// RESTORE PREVIOUS EXAM TIMER
// ======================================================

function restoreExamTimer() {

    const savedStart =
        localStorage.getItem(
            "maarifatSession2ExamStart"
        );

    const savedDeadline =
        localStorage.getItem(
            "maarifatSession2ExamDeadline"
        );


    if (!savedStart || !savedDeadline) {

        return false;

    }


    const now =
        getServerNow();


    const deadline =
        Number(savedDeadline);


    // اگر امتحان کا وقت پہلے ہی ختم ہو چکا ہے

    if (now >= deadline) {

        localStorage.removeItem(
            "maarifatSession2ExamStart"
        );

        localStorage.removeItem(
            "maarifatSession2ExamDeadline"
        );

        return false;

    }


    examStartTime =
        Number(savedStart);

    examDeadline =
        deadline;

    examStarted = true;


    showExamStatus(
        "امتحان جاری ہے۔"
    );


    submitBtn.disabled = false;


    updateTimer();


    timerInterval =
        setInterval(
            updateTimer,
            1000
        );


    return true;

}


// ======================================================
// CHECK EXAM WINDOW
// ======================================================

async function checkExamWindow() {

    await getServerTime();


    const now =
        getServerNow();


    // ------------------------------------------
    // امتحان شروع ہونے سے پہلے
    // ------------------------------------------

    if (now < EXAM_START) {

        showExamStatus(
            "امتحان 10 اگست 2026 کو شام 7:00 بجے شروع ہوگا۔"
        );


        timerElement.textContent =
            "امتحان شروع نہیں ہوا";


        submitBtn.disabled = true;


        return;

    }


    // ------------------------------------------
    // امتحان کا آخری وقت گزر گیا
    // ------------------------------------------

    if (now >= EXAM_END) {

        showExamStatus(
            "امتحان کا مقررہ وقت ختم ہو چکا ہے۔"
        );


        timerElement.textContent =
            "وقت ختم";


        submitBtn.disabled = true;


        return;

    }


    // ------------------------------------------
    // پہلے سے شروع کیا ہوا امتحان
    // ------------------------------------------

    const restored =
        restoreExamTimer();


    if (restored) {

        return;

    }


    // ------------------------------------------
    // نیا امتحان شروع
    // ------------------------------------------

    startExamTimer();

}


// ======================================================
// LOAD QUESTIONS
// ======================================================

async function loadQuestions() {

    quizContainer.innerHTML =
        "<h3>سوالات لوڈ ہو رہے ہیں...</h3>";


    try {

        const snapshot =
            await get(
                ref(db, "questions")
            );


        if (!snapshot.exists()) {

            quizContainer.innerHTML =
                "<h3>ابھی کوئی سوال موجود نہیں۔</h3>";

            return;

        }


        questions = [];


        snapshot.forEach(
            (child) => {

                questions.push(
                    child.val()
                );

            }
        );


        quizContainer.innerHTML =
            "";


        displayQuestions();


        // سوالات لوڈ ہونے کے بعد
        // امتحان کا وقت چیک کریں

        await checkExamWindow();

    }

    catch (error) {

        console.error(
            "Question loading error:",
            error
        );


        quizContainer.innerHTML =
            "<h3>سوالات لوڈ کرنے میں مسئلہ پیش آیا۔</h3>";

    }

}


// ======================================================
// DISPLAY QUESTIONS
// ======================================================

function displayQuestions() {

    questions.forEach(
        (q, index) => {

            const html = `

            <div class="question">

                <h3>
                    ${index + 1}.
                    ${q.question}
                </h3>


                <label>

                    <input
                        type="radio"
                        name="q${index}"
                        value="0"
                    >

                    ${q.options[0]}

                </label>

                <br>


                <label>

                    <input
                        type="radio"
                        name="q${index}"
                        value="1"
                    >

                    ${q.options[1]}

                </label>

                <br>


                <label>

                    <input
                        type="radio"
                        name="q${index}"
                        value="2"
                    >

                    ${q.options[2]}

                </label>

                <br>


                <label>

                    <input
                        type="radio"
                        name="q${index}"
                        value="3"
                    >

                    ${q.options[3]}

                </label>

            </div>

            `;


            quizContainer.innerHTML +=
                html;

        }
    );

}


// ======================================================
// CALCULATE SCORE
// ======================================================

function calculateScore() {

    let score = 0;


    questions.forEach(
        (q, index) => {

            const selected =
                document.querySelector(
                    `input[name="q${index}"]:checked`
                );


            if (!selected) {

                return;

            }


            const selectedIndex =
                Number(selected.value);


            if (
                selectedIndex ===
                Number(q.answer)
            ) {

                score++;

            }

        }
    );


    return score;

}


// ======================================================
// SUBMIT EXAM
// ======================================================

async function submitExam(
    automatic = false
) {

    if (examSubmitted) {

        return;

    }


    examSubmitted = true;


    if (timerInterval) {

        clearInterval(
            timerInterval
        );

    }


    submitBtn.disabled = true;


    const score =
        calculateScore();


    const total =
        questions.length;


    const percentage =
        total > 0
            ? ((score / total) * 100).toFixed(2)
            : "0.00";


    const submittedAt =
        getServerNow();


    try {

        await push(
            ref(db, "results"),
            {

                studentName:
                    studentName,

                score:
                    score,

                total:
                    total,

                percentage:
                    percentage,

                course:
                    "Maarifat-e-Masomeen",

                session:
                    "Session 2",

                topic:
                    "Imam Muhammad Baqir (ع)",

                submittedAt:
                    submittedAt,

                publishAt:
                    RESULT_PUBLISH_TIME,

                resultStatus:
                    "pending",

                automaticSubmit:
                    automatic,

                examDate:
                    "10 August 2026",

                examStart:
                    "7:00 PM",

                examEnd:
                    "11:00 PM"

            }
        );


        // پرانا ٹائمر ختم

        localStorage.removeItem(
            "maarifatSession2ExamStart"
        );

        localStorage.removeItem(
            "maarifatSession2ExamDeadline"
        );


        timerElement.textContent =
            "00:00:00";


        if (automatic) {

            showExamStatus(
                "⏰ وقت ختم ہو گیا۔ امتحان خودکار طور پر جمع کر دیا گیا ہے۔"
            );

        }

        else {

            showExamStatus(
                "امتحان کامیابی سے جمع ہو گیا ہے۔"
            );

        }


        resultBox.innerHTML = `

            <div class="exam-result-message">

                <h2>
                    امتحان جمع ہو گیا
                </h2>

                <p>
                    آپ کے جوابات کامیابی سے محفوظ کر لیے گئے ہیں۔
                </p>

                <p>
                    نتیجہ 11 اگست 2026 کو شام 7:00 بجے جاری کیا جائے گا۔
                </p>

                <p>
                    <strong>
                        Result Awaiting Publication
                    </strong>
                </p>

            </div>

        `;


    }

    catch (error) {

        console.error(
            "Result saving error:",
            error
        );


        examSubmitted = false;

        submitBtn.disabled = false;


        resultBox.innerHTML = `

            <p>
                نتیجہ محفوظ نہیں ہو سکا۔
                براہِ کرم دوبارہ کوشش کریں۔
            </p>

        `;

    }

}


// ======================================================
// MANUAL SUBMIT BUTTON
// ======================================================

submitBtn.addEventListener(
    "click",
    async () => {

        if (!examStarted) {

            return;

        }


        const confirmSubmit =
            confirm(
                "کیا آپ واقعی امتحان جمع کرنا چاہتے ہیں؟"
            );


        if (!confirmSubmit) {

            return;

        }


        await submitExam(false);

    }
);


// ======================================================
// AUTOMATIC SUBMIT
// ======================================================

async function autoSubmitExam() {

    if (examSubmitted) {

        return;

    }


    await submitExam(true);

}


// ======================================================
// START
// ======================================================

loadQuestions();
