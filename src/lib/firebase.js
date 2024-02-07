// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAULvL70hOCeqhyC8J7EQaOiYFf0oGX-p0",
  authDomain: "myreactproject-1b30c.firebaseapp.com",
  projectId: "myreactproject-1b30c",
  storageBucket: "myreactproject-1b30c.appspot.com",
  messagingSenderId: "1011601332690",
  appId: "1:1011601332690:web:b8323661aa00faca6dd00b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const [auth, db] = [getAuth(app), getFirestore(app)];
