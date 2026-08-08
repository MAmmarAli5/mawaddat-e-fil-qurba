// =====================================================
// STUDENT DASHBOARD
// =====================================================


// =====================================================
// FIREBASE IMPORTS
// =====================================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {
    getDatabase,
    ref,
    get
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// =====================================================
// FIREBASE CONFIG
// =====================================================

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


// =====================================================
// INITIALIZE
// =====================================================

const app =
    initializeApp(firebaseConfig);


const auth =
    getAuth(app);


const db =
    getDatabase(app);


// =====================================================
// ELEMENTS
// =====================================================

const studentName =
    document.getElementById("studentName");

const studentEmail =
    document.getElementById("studentEmail");

const infoName =
    document.getElementById("infoName");

const infoEmail =
    document.getElementById("infoEmail");

const infoPhone =
    document.getElementById("infoPhone");

const infoWhatsapp =
    document.getElementById("infoWhatsapp");

const infoAge =
    document.getElementById("infoAge");

const infoCity =
    document.getElementById("infoCity");

const courseName =
    document.getElementById("courseName");

const courseStatus =
    document.getElementById("courseStatus");

const statusCard =
    document.getElementById("statusCard");

const courseActions =
    document.getElementById("courseActions");

const examBtn =
    document.getElementById("examBtn");

const logoutBtn =
    document.getElementById("logoutBtn");


// =====================================================
// AUTHENTICATION CHECK
// =====================================================

onAuthStateChanged(
    auth,
    async (user) => {


        // -------------------------------------------------
        // NOT LOGGED IN
        // -------------------------------------------------

        if (!user) {

            window.location.href =
                "student-login.html";

            return;

        }


        // -------------------------------------------------
        // LOAD STUDENT
        // -------------------------------------------------

        await loadStudent(
            user.uid
        );

    }
);


// =====================================================
// LOAD STUDENT DATA
// =====================================================

async function loadStudent(uid) {


    try {


        const studentRef =
            ref(
                db,
                "students/" + uid
            );


        const snapshot =
            await get(studentRef);


        if (!snapshot.exists()) {


            statusCard.innerHTML = `

                <h2>
                    Student Record Not Found
                </h2>

                <p>
                    آپ کا طالب علم ریکارڈ موجود نہیں ہے۔
                </p>

            `;

            return;

        }


        const student =
            snapshot.val();


        // =================================================
        // BASIC INFORMATION
        // =================================================

        studentName.textContent =
            student.name || "Student";


        studentEmail.textContent =
            student.email || "-";


        infoName.textContent =
            student.name || "-";


        infoEmail.textContent =
            student.email || "-";


        infoPhone.textContent =
            student.phone || "-";


        infoWhatsapp.textContent =
            student.whatsapp || "-";


        infoAge.textContent =
            student.age || "-";


        infoCity.textContent =
            student.city || "-";


        courseName.textContent =
            student.course || "-";


        // =================================================
        // CHECK APPROVAL
        // =================================================

        const status =
            student.status || "pending";


        const enrolled =
            student.enrolled === true;


        // =================================================
        // PENDING
        // =================================================

        if (
            status === "pending" ||
            enrolled === false
        ) {


            statusCard.className =
                "status-card pending";


            statusCard.innerHTML = `

                <div style="font-size:38px;">
                    ⏳
                </div>

                <h2 style="color:#8a6d1d;">
                    منظوری کا انتظار
                </h2>

                <p style="margin-top:8px;color:#777;">
                    آپ کی درخواست کامیابی سے موصول ہو گئی ہے۔
                    منتظمین آپ کی درخواست کا جائزہ لے رہے ہیں۔
                </p>

            `;


            courseStatus.textContent =
                "Approval Pending";


            courseStatus.style.background =
                "#fff1bd";


            courseStatus.style.color =
                "#80661b";


            courseActions.innerHTML = `

                <p style="color:#777;">
                    منظوری کے بعد آپ کے کورس کی کلاسز
                    یہاں ظاہر ہوں گی۔
                </p>

            `;


            examBtn.disabled =
                true;


            examBtn.style.opacity =
                "0.5";


            return;

        }


        // =================================================
        // APPROVED
        // =================================================

        if (
            status === "approved" &&
            enrolled === true
        ) {


            statusCard.className =
                "status-card approved";


            statusCard.innerHTML = `

                <div style="font-size:38px;">
                    ✅
                </div>

                <h2 style="color:#23704f;">
                    آپ کا داخلہ منظور ہو گیا ہے
                </h2>

                <p style="margin-top:8px;color:#777;">
                    اب آپ اپنے کورس کی کلاسز اور
                    تعلیمی مواد تک رسائی حاصل کر سکتے ہیں۔
                </p>

            `;


            courseStatus.textContent =
                "Enrolled";


            courseStatus.style.background =
                "#dff3e8";


            courseStatus.style.color =
                "#23704f";


            courseActions.innerHTML = `

                <button
                    class="primary-btn"
                    id="classesBtn">

                    📚 Classes

                </button>


                <button
                    class="secondary-btn"
                    id="booksBtn">

                    📖 Course Book

                </button>


            `;


            // -------------------------------------------------
            // CLASSES
            // -------------------------------------------------

            document
                .getElementById("classesBtn")
                .addEventListener(
                    "click",
                    () => {

                        window.location.href =
                            "course-classes.html";

                    }
                );


            // -------------------------------------------------
            // BOOK
            // -------------------------------------------------

            document
                .getElementById("booksBtn")
                .addEventListener(
                    "click",
                    () => {

                        window.location.href =
                            "course-book.html";

                    }
                );


            // -------------------------------------------------
            // EXAM
            // -------------------------------------------------

            examBtn.disabled =
                false;


            examBtn.style.opacity =
                "1";


            return;

        }


        // =================================================
        // OTHER STATUS
        // =================================================

        statusCard.innerHTML = `

            <div style="font-size:38px;">
                ℹ️
            </div>

            <h2>
                Account Status
            </h2>

            <p>
                Status: ${status}
            </p>

        `;


    }

    catch (error) {


        console.error(
            "Student Loading Error:",
            error
        );


        statusCard.innerHTML = `

            <h2>
                معلومات حاصل نہیں ہو سکیں
            </h2>

            <p>
                براہِ کرم دوبارہ کوشش کریں۔
            </p>

        `;

    }

}


// =====================================================
// EXAM BUTTON
// =====================================================

examBtn.addEventListener(
    "click",
    () => {

        window.location.href =
            "exam.html";

    }
);


// =====================================================
// LOGOUT
// =====================================================

logoutBtn.addEventListener(
    "click",
    async () => {


        try {


            await signOut(auth);


            localStorage.removeItem(
                "studentName"
            );


            localStorage.removeItem(
                "studentUID"
            );


            window.location.href =
                "student-login.html";


        }

        catch (error) {


            console.error(
                "Logout Error:",
                error
            );


            alert(
                "Logout failed. Please try again."
            );

        }

    }
);
