// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { defaults } from "autoprefixer";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDERQQYzjOxXjF_niCOlQ5GZG-nKf67exo",
  authDomain: "tiwariajayvirendra.firebaseapp.com",
  projectId: "tiwariajayvirendra",
  storageBucket: "tiwariajayvirendra.firebasestorage.app",
  messagingSenderId: "1014636613851",
  appId: "1:1014636613851:web:c5fcc05c1cd719c1d1fcfe",
  measurementId: "G-0G4HNNBKKQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
