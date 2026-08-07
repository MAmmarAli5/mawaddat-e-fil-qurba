import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ======================================
// FIREBASE CONFIG
// ======================================

const firebaseConfig = {

    apiKey: "AIzaSyB3FCQ0PFQaQDwdjIvvVd3shQ_EXqL3iMA",

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


// ======================================
// FIREBASE
// ======================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


// ======================================
// ADMIN UID
// ======================================

const ADMIN_UID =
    "OE0IbtLPAoX9ajtlZtSorC6U3o33";


// ======================================
// CHECK ADMIN
// ======================================

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href =
            "pages/admin-login.html";

        return;
    }


    if (user.uid !== ADMIN_UID) {

        alert(
            "آپ کو انتظامی صفحے تک رسائی حاصل نہیں ہے۔"
        );

        window.location.href =
            "pages/admin-login.html";

        return;
    }


    console.log(
        "Admin verified successfully."
    );

});
