// Firebase SDK Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase,
  ref,
  push
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB3FCQ0PFQaQDwdjIvvVd3shQ_EXqL3iMA",
  authDomain: "mawaddat-fil-qurba.firebaseapp.com",
  databaseURL: "https://mawaddat-fil-qurba-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mawaddat-fil-qurba",
  storageBucket: "mawaddat-fil-qurba.firebasestorage.app",
  messagingSenderId: "637175775327",
  appId: "1:637175775327:web:95da7d655c7606f5ef9bea"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, push };
