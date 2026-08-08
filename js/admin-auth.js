import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged(
    auth,
    async (user) => {

        if (!user) {

            window.location.href =
                "pages/login.html";

            return;

        }


        try {

            const adminRef =
                ref(
                    db,
                    "admins/" + user.uid
                );


            const snapshot =
                await get(adminRef);


            if (
                !snapshot.exists() ||
                snapshot.val().role !== "admin"
            ) {

                await signOut(auth);

                localStorage.removeItem(
                    "adminLoggedIn"
                );

                localStorage.removeItem(
                    "adminUID"
                );


                alert(
                    "Access Denied: یہ Admin اکاؤنٹ نہیں ہے۔"
                );


                window.location.href =
                    "pages/login.html";

                return;

            }


            // Admin verified

            localStorage.setItem(
                "adminLoggedIn",
                "true"
            );


            localStorage.setItem(
                "adminUID",
                user.uid
            );


            console.log(
                "Admin authenticated:",
                user.email
            );

        }

        catch (error) {

            console.error(
                "Admin verification error:",
                error
            );


            await signOut(auth);


            window.location.href =
                "pages/login.html";

        }

    }
);
import {
    getDatabase,
    ref,
    get
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
