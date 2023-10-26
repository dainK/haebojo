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
  apiKey: "AIzaSyDUo_SmVfJreDU53QjZHUFzvpFJJw5nq0U",
  authDomain: "haebojo.firebaseapp.com",
  projectId: "haebojo",
  storageBucket: "haebojo.appspot.com",
  messagingSenderId: "511844569229",
  appId: "1:511844569229:web:0eaa9c3b8b1e04fb53d2c4",
  measurementId: "G-CVW502KM9W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const db = getFirestore(app);
