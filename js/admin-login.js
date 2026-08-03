import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase Config یہاں

const firebaseConfig = {
    apiKey: "AIzaSyB3FCQ0PFQaQDwdjIvvVd3shQ_EXqL3iMA",
    authDomain: "mawaddat-fil-qurba.firebaseapp.com",
    databaseURL: "https://mawaddat-fil-qurba-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mawaddat-fil-qurba",
    storageBucket: "mawaddat-fil-qurba.firebasestorage.app",
    messagingSenderId: "637175775327",
    appId: "1:637175775327:web:95da7d655c7606f5ef9bea"
   // آپ کی Config
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
