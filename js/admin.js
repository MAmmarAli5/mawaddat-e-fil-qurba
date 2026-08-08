// ======================================================
// MAWADDAT-E-FIL-QURBA
// ADMIN PANEL
// RESULTS MANAGEMENT
// ======================================================


// ======================================================
// FIREBASE APP
// ======================================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


// ======================================================
// FIREBASE AUTHENTICATION
// ======================================================

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ======================================================
// FIREBASE DATABASE
// ======================================================

import {
    getDatabase,
    ref,
    onValue,
    remove,
    update,
    set
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// ======================================================
// FIREBASE CONFIG
// ======================================================

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


// ======================================================
// INITIALIZE FIREBASE
// ======================================================

const app =
    initializeApp(firebaseConfig);

const auth =
    getAuth(app);

const db =
    getDatabase(app);


// ======================================================
// HTML ELEMENTS
// ======================================================

const table =
    document.getElementById("resultsTable");

const search =
    document.getElementById("search");

const logoutBtn =
    document.getElementById("logoutBtn");

const publishBtn =
    document.getElementById("publishBtn");

const topperName =
    document.getElementById("topperName");

const topperMarks =
    document.getElementById("topperMarks");

const totalStudentsBox =
    document.getElementById("totalStudents");

const averageMarksBox =
    document.getElementById("averageMarks");

const highestMarksBox =
    document.getElementById("highestMarks");

const excelBtn =
    document.getElementById("excelBtn");

const pdfBtn =
    document.getElementById("pdfBtn");


// ======================================================
// DATABASE REFERENCES
// ======================================================

const resultsRef =
    ref(db, "Results");

const settingsRef =
    ref(db, "Settings");

const resultsPublishedRef =
    ref(db, "Settings/resultsPublished");


// ======================================================
// VARIABLES
// ======================================================

let totalStudents = 0;

let totalScore = 0;

let highestScore = -1;

let highestTotal = 0;

let topper = "";

let allResults = [];

let resultPublishTime = null;


// ======================================================
// ADMIN LOGIN PROTECTION
// ======================================================

onAuthStateChanged(
    auth,
    (user) => {

        if (!user) {

            window.location.href =
                "admin-login.html";

            return;
        }

        console.log(
            "Admin authenticated:",
            user.email
        );
    }
);


// ======================================================
// LOAD SETTINGS
// ======================================================

onValue(
    settingsRef,
    (snapshot) => {

        if (!snapshot.exists()) {

            console.log(
                "Settings not found."
            );

            return;
        }


        const settings =
            snapshot.val();


        if (
            settings.resultPublish
        ) {

            resultPublishTime =
                new Date(
                    settings.resultPublish
                ).getTime();

        }


        updatePublishButton();

    }
);


// ======================================================
// UPDATE PUBLISH BUTTON
// ======================================================

function updatePublishButton() {

    if (!publishBtn) {

        return;
    }


    const now =
        Date.now();


    // اگر نتیجہ پہلے ہی publish ہوچکا ہے

    if (
        window.resultsAlreadyPublished ===
        true
    ) {

        publishBtn.innerHTML =
            "✅ Results Published";

        publishBtn.disabled =
            true;

        return;
    }


    // اگر publish time ابھی نہیں آیا

    if (
        resultPublishTime &&
        now < resultPublishTime
    ) {

        publishBtn.innerHTML =
            "🔒 Results Locked Until 16 August 2026, 7:00 PM";

        publishBtn.disabled =
            true;

        return;
    }


    publishBtn.innerHTML =
        "📢 Publish Results";

    publishBtn.disabled =
        false;
}


// ======================================================
// LOAD RESULTS
// ======================================================

onValue(
    resultsRef,
    (snapshot) => {

        table.innerHTML = "";

        totalStudents = 0;

        totalScore = 0;

        highestScore = -1;

        highestTotal = 0;

        topper = "";

        allResults = [];


        if (!snapshot.exists()) {

            table.innerHTML = `

                <tr>

                    <td colspan="6">

                        ابھی کوئی نتیجہ موجود نہیں۔

                    </td>

                </tr>

            `;

            updateStatistics();

            return;
        }


        snapshot.forEach(
            (childSnapshot) => {

                const data =
                    childSnapshot.val();

                const id =
                    childSnapshot.key;


                allResults.push({

                    id: id,

                    ...data

                });


                totalStudents++;


                const score =
                    Number(
                        data.score || 0
                    );


                const total =
                    Number(
                        data.total || 0
                    );


                totalScore +=
                    score;


                if (
                    score >
                    highestScore
                ) {

                    highestScore =
                        score;

                    highestTotal =
                        total;

                    topper =
                        data.studentName ||
                        "Unknown";

                }


                const percentage =
                    data.percentage ??
                    (
                        total > 0
                            ? (
                                score /
                                total *
                                100
                              ).toFixed(2)
                            : "0.00"
                    );


                const status =
                    data.resultStatus ||
                    "pending";


                const statusText =
                    status === "published"

                        ? "✅ Published"

                        : "⏳ Pending";


                const date =
                    data.date ||
                    (
                        data.submittedAt
                            ? new Date(
                                data.submittedAt
                              ).toLocaleString()
                            : "-"
                    );


                table.innerHTML += `

                    <tr>

                        <td>
                            ${escapeHTML(
                                data.studentName ||
                                "Unknown"
                            )}
                        </td>

                        <td>
                            ${score} / ${total}
                        </td>

                        <td>
                            ${percentage}%
                        </td>

                        <td>
                            ${date}
                        </td>

                        <td>
                            ${statusText}
                        </td>

                        <td>

                            <button
                                class="delete-btn"
                                onclick="deleteResult('${id}')"
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                `;

            }
        );


        updateStatistics();

    }
);


// ======================================================
// UPDATE STATISTICS
// ======================================================

function updateStatistics() {

    if (topperName) {

        topperName.innerHTML =
            topper || "-";
    }


    if (topperMarks) {

        topperMarks.innerHTML =
            highestScore >= 0
                ? highestScore +
                  " / " +
                  highestTotal
                : "0";
    }


    if (totalStudentsBox) {

        totalStudentsBox.innerHTML =
            totalStudents;
    }


    if (highestMarksBox) {

        highestMarksBox.innerHTML =
            highestScore >= 0
                ? highestScore +
                  " / " +
                  highestTotal
                : "0";
    }


    if (averageMarksBox) {

        if (totalStudents > 0) {

            averageMarksBox.innerHTML =
                (
                    totalScore /
                    totalStudents
                ).toFixed(2) + "%";

        }
        else {

            averageMarksBox.innerHTML =
                "0%";
        }
    }
}


// ======================================================
// SEARCH
// ======================================================

if (search) {

    search.addEventListener(
        "keyup",
        () => {

            const filter =
                search.value
                    .toLowerCase()
                    .trim();


            const rows =
                table.getElementsByTagName(
                    "tr"
                );


            for (
                let i = 0;
                i < rows.length;
                i++
            ) {

                const firstCol =
                    rows[i]
                        .getElementsByTagName(
                            "td"
                        )[0];


                if (firstCol) {

                    const text =
                        firstCol
                            .textContent
                            .toLowerCase();


                    rows[i].style.display =
                        text.includes(filter)
                            ? ""
                            : "none";

                }
            }

        }
    );

}


// ======================================================
// DELETE RESULT
// ======================================================

window.deleteResult =
    async function(id) {

        const confirmDelete =
            confirm(
                "کیا آپ واقعی اس طالب علم کا نتیجہ حذف کرنا چاہتے ہیں؟"
            );


        if (!confirmDelete) {

            return;
        }


        try {

            await remove(
                ref(
                    db,
                    "Results/" + id
                )
            );


            alert(
                "نتیجہ کامیابی سے حذف ہوگیا۔"
            );

        }

        catch (error) {

            console.error(error);

            alert(
                "نتیجہ حذف نہیں ہوسکا: " +
                error.message
            );

        }

    };


// ======================================================
// PUBLISH RESULTS
// ======================================================

if (publishBtn) {

    publishBtn.addEventListener(
        "click",
        async () => {

            const now =
                Date.now();


            // وقت سے پہلے Publish نہ ہو

            if (
                resultPublishTime &&
                now < resultPublishTime
            ) {

                alert(
                    "نتائج 16 اگست 2026 کو شام 7:00 بجے سے پہلے شائع نہیں کیے جاسکتے۔"
                );

                return;
            }


            const confirmPublish =
                confirm(
                    "کیا آپ تمام نتائج شائع کرنا چاہتے ہیں؟"
                );


            if (!confirmPublish) {

                return;
            }


            try {

                const updates = {};


                allResults.forEach(
                    (result) => {

                        updates[
                            "Results/" +
                            result.id +
                            "/resultStatus"
                        ] =
                            "published";


                        updates[
                            "Results/" +
                            result.id +
                            "/publishedAt"
                        ] =
                            now;

                    }
                );


                // تمام نتائج Published

                if (
                    Object.keys(updates)
                        .length > 0
                ) {

                    await update(
                        ref(db),
                        updates
                    );

                }


                // Settings میں بھی status محفوظ

                await set(
                    resultsPublishedRef,
                    true
                );


                window.resultsAlreadyPublished =
                    true;


                publishBtn.innerHTML =
                    "✅ Results Published";

                publishBtn.disabled =
                    true;


                alert(
                    "تمام نتائج کامیابی سے شائع ہوگئے۔"
                );

            }

            catch (error) {

                console.error(error);

                alert(
                    "نتائج شائع نہیں ہوسکے: " +
                    error.message
                );

            }

        }
    );

}


// ======================================================
// RESULT PUBLISHED STATUS
// ======================================================

onValue(
    resultsPublishedRef,
    (snapshot) => {

        window.resultsAlreadyPublished =
            snapshot.exists()
                ? snapshot.val() === true
                : false;


        updatePublishButton();

    }
);


// ======================================================
// LOGOUT
// ======================================================

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        async () => {

            const confirmLogout =
                confirm(
                    "کیا آپ Admin Panel سے Logout کرنا چاہتے ہیں؟"
                );


            if (!confirmLogout) {

                return;
            }


            try {

                await signOut(auth);

                window.location.href =
                    "admin-login.html";

            }

            catch (error) {

                alert(
                    "Logout Error: " +
                    error.message
                );

            }

        }
    );

}


// ======================================================
// EXCEL EXPORT
// ======================================================

if (excelBtn) {

    excelBtn.addEventListener(
        "click",
        () => {

            if (
                typeof XLSX ===
                "undefined"
            ) {

                alert(
                    "Excel library load نہیں ہوئی۔"
                );

                return;
            }


            const wb =
                XLSX.utils.book_new();


            const wsData = [

                [
                    "Student Name",
                    "Marks",
                    "Percentage",
                    "Date",
                    "Status"
                ]

            ];


            allResults.forEach(
                (result) => {

                    wsData.push([

                        result.studentName ||
                            "Unknown",

                        (
                            result.score ||
                            0
                        ) +
                        " / " +
                        (
                            result.total ||
                            0
                        ),

                        (
                            result.percentage ||
                            "0"
                        ) + "%",

                        result.date ||
                            (
                                result.submittedAt
                                    ? new Date(
                                        result.submittedAt
                                      ).toLocaleString()
                                    : "-"
                            ),

                        result.resultStatus ===
                            "published"

                            ? "Published"

                            : "Pending"

                    ]);

                }
            );


            const ws =
                XLSX.utils.aoa_to_sheet(
                    wsData
                );


            XLSX.utils.book_append_sheet(
                wb,
                ws,
                "Results"
            );


            XLSX.writeFile(
                wb,
                "Mawaddat_Fil_Qurba_Results.xlsx"
            );

        }
    );

}


// ======================================================
// PDF EXPORT
// ======================================================

if (pdfBtn) {

    pdfBtn.addEventListener(
        "click",
        () => {

            if (
                !window.jspdf
            ) {

                alert(
                    "PDF library load نہیں ہوئی۔"
                );

                return;
            }


            const {
                jsPDF
            } =
                window.jspdf;


            const doc =
                new jsPDF();


            doc.setFontSize(18);

            doc.text(
                "Mawaddat-e-Fil-Qurba",
                20,
                20
            );


            doc.setFontSize(14);

            doc.text(
                "Maarifat-e-Masomeen - Session 2",
                20,
                30
            );


            doc.setFontSize(11);

            doc.text(
                "Exam Date: 15 August 2026",
                20,
                40
            );


            doc.text(
                "Result Date: 16 August 2026 - 7:00 PM",
                20,
                48
            );


            let y = 62;


            doc.text(
                "Student",
                15,
                y
            );

            doc.text(
                "Marks",
                85,
                y
            );

            doc.text(
                "%",
                125,
                y
            );

            doc.text(
                "Status",
                145,
                y
            );


            y += 8;


            allResults.forEach(
                (result) => {

                    const name =
                        result.studentName ||
                        "Unknown";


                    const marks =
                        (
                            result.score ||
                            0
                        ) +
                        "/" +
                        (
                            result.total ||
                            0
                        );


                    const percentage =
                        (
                            result.percentage ||
                            "0"
                        ) + "%";


                    const status =
                        result.resultStatus ===
                        "published"

                            ? "Published"

                            : "Pending";


                    doc.text(
                        String(name)
                            .substring(0, 30),
                        15,
                        y
                    );


                    doc.text(
                        marks,
                        85,
                        y
                    );


                    doc.text(
                        percentage,
                        125,
                        y
                    );


                    doc.text(
                        status,
                        145,
                        y
                    );


                    y += 8;


                    if (y > 275) {

                        doc.addPage();

                        y = 20;

                    }

                }
            );


            doc.save(
                "Mawaddat_Fil_Qurba_Results.pdf"
            );

        }
    );

}


// ======================================================
// HTML ESCAPE
// ======================================================

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );
}


// ======================================================
// CONSOLE
// ======================================================

console.log(
    "✅ Mawaddat-e-Fil-Qurba Admin Panel Loaded"
);
