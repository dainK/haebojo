// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getFirestore,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBDAeGphZEQnYLkGBNgLYbqicQKJkYk9e8",
  authDomain: "goqhwh.firebaseapp.com",
  projectId: "goqhwh",
  storageBucket: "goqhwh.appspot.com",
  messagingSenderId: "469695505754",
  appId: "1:469695505754:web:1515bc8ba77e52e6c27f63",
  measurementId: "G-8RNJDHPPVP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const db = getFirestore(app);
