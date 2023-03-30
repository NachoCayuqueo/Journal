// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBC7PtwUm7w6YkiQGDPj_FYWPVi8_TtUtU",
  authDomain: "react-proyect-617ee.firebaseapp.com",
  projectId: "react-proyect-617ee",
  storageBucket: "react-proyect-617ee.appspot.com",
  messagingSenderId: "133320795793",
  appId: "1:133320795793:web:441fa19e7695f0f0334130",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);
