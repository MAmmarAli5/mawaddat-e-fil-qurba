// =====================================
// STUDENT ENROLLMENT
// =====================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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
// INITIALIZE FIREBASE
// =====================================

const app =
    initializeApp(firebaseConfig);

const auth =
    getAuth(app);

const db =
    getDatabase(app);


// =====================================
// HTML ELEMENTS
// =====================================

const form =
    document.getElementById("enrollForm");

const message =
    document.getElementById("enrollMessage");


// =====================================
// SUBMIT ENROLLMENT
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

        const password =
            document.getElementById("password")
            .value;

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
            "⏳ آپ کی درخواست جمع کی جا رہی ہے...";


        try {

            // =================================
            // CREATE FIREBASE ACCOUNT
            // =================================

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            const user =
                userCredential.user;


            const uid =
                user.uid;


            console.log(
                "Student UID:",
                uid
            );


            // =================================
            // SAVE ENROLLMENT
            // =================================

            const enrollmentsRef =
                ref(db, "enrollments");

            const newEnrollment =
                push(enrollmentsRef);


            await set(
                newEnrollment,
                {

                    uid: uid,

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


            // =================================
            // SIGN OUT AFTER REGISTRATION
            // =================================

            await signOut(auth);


            // =================================
            // SUCCESS MESSAGE
            // =================================

            message.innerHTML = `

                <div class="success-message">

                    <h3>
                        ✅ درخواست کامیابی سے جمع ہوگئی
                    </h3>

                    <p>
                        محترم ${name}
                    </p>

                    <p>
                        آپ کا طالب علم اکاؤنٹ بن گیا ہے۔
                    </p>

                    <p>
                        آپ کی درخواست فی الحال
                        Admin کی منظوری کے انتظار میں ہے۔
                    </p>

                    <p>
                        منظوری کے بعد آپ اپنے Email اور Password
                        کے ذریعے Login کر سکیں گے۔
                    </p>

                </div>

            `;


            form.reset();

        }

        catch (error) {

            console.error(error);


            if (
                error.code ===
                "auth/email-already-in-use"
            ) {

                message.innerHTML =
                    "❌ یہ Email پہلے سے رجسٹرڈ ہے۔";

            }

            else if (
                error.code ===
                "auth/weak-password"
            ) {

                message.innerHTML =
                    "❌ Password کم از کم 6 حروف کا ہونا چاہیے۔";

            }

            else if (
                error.code ===
                "auth/invalid-email"
            ) {

                message.innerHTML =
                    "❌ Email درست نہیں ہے۔";

            }

            else {

                message.innerHTML =
                    "❌ درخواست جمع نہیں ہوسکی۔ دوبارہ کوشش کریں۔";

            }

        }

    }
);
