// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, getDocs, doc, setDoc, getDoc, updateDoc ,  collection, addDoc} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBvkQMypGDR1HHLoU_c4g-JEqIfb0NMw60",
    authDomain: "sparta-eight.firebaseapp.com",
    projectId: "sparta-eight",
    storageBucket: "sparta-eight.appspot.com",
    messagingSenderId: "1083363522950",
    appId: "1:1083363522950:web:707cdbd5905fa43d839407",
    measurementId: "G-STP1V2J94X"
  };

  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);