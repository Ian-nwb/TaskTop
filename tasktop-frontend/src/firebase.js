// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeGRKJitZKvalLdQ3WQZ1DczxcOdU3lbM",
  authDomain: "tasktop-76996.firebaseapp.com",
  projectId: "tasktop-76996",
  storageBucket: "tasktop-76996.firebasestorage.app",
  messagingSenderId: "451399387433",
  appId: "1:451399387433:web:144d0e391e60b5455a0f38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db  = getFirestore(app);