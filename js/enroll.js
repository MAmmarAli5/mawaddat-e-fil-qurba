// =====================================
// ENROLLMENT FORM
// =====================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    set
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// =====================================
// FIREBASE CONFIG
// =====================================

const firebaseConfig = {

    apiKey:
        "AIzaSyB3FCQ0PFQaQDwdjIvvVd3shQ_EXqL3iMA",

    authDomain:
        "mawaddat-fil-qurba.firebaseapp.com",

    databaseURL:
        "https://mawaddat-fil-qurba-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId:
        "mawaddat-fil-qurba",

    storageBucket:
        "mawaddat-fil-qurba.firebasestorage.app",

    messagingSenderId:
        "637175775327",

    appId:
        "1:637175775327:web:95da7d655c7606f5ef9bea"

};


// =====================================
// INITIALIZE
// =====================================

const app =
    initializeApp(firebaseConfig);

const db =
    getDatabase(app);


// =====================================
// ELEMENTS
// =====================================

const form =
    document.getElementById("enrollForm");

const message =
    document.getElementById("enrollMessage");


// =====================================
// SUBMIT
// =====================================

form.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const name =
            document.getElementById("name")
            .value.trim();


        const email =
            document.getElementById("email")
            .value.trim();


        const phone =
            document.getElementById("phone")
            .value.trim();


        const whatsapp =
            document.getElementById("whatsapp")
            .value.trim();


        const age =
            document.getElementById("age")
            .value;


        const city =
            document.getElementById("city")
            .value.trim();


        const course =
            document.getElementById("course")
            .value;


        message.innerHTML =
            "⏳ Submitting your application...";


        try {


            const studentsRef =
                ref(db, "enrollments");


            const newStudent =
                push(studentsRef);


            await set(
                newStudent,
                {

                    name: name,

                    email: email,

                    phone: phone,

                    whatsapp: whatsapp,

                    age: age,

                    city: city,

                    course: course,

                    batch: "2026",

                    status: "pending",

                    enrolledAt:
                        new Date().toISOString()

                }
            );


            message.innerHTML = `

                <div class="success-message">

                    <h3>
                        ✅ Application Submitted
                    </h3>

                    <p>
                        Thank you, ${name}.
                    </p>

                    <p>
                        Your enrollment request has been
                        submitted successfully.
                    </p>

                    <p>
                        Admin approval is required.
                    </p>

                </div>

            `;


            form.reset();


        }

        catch (error) {

            console.error(error);


            message.innerHTML = `

                <div class="error-message">

                    ❌ Something went wrong.

                </div>

            `;

        }

    }
);
