// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC95SVxG0OQgXKVygypUeGpdZcrrXrgo88",
  authDomain: "bistro-boss-644cd.firebaseapp.com",
  projectId: "bistro-boss-644cd",
  storageBucket: "bistro-boss-644cd.appspot.com",
  messagingSenderId: "894631402123",
  appId: "1:894631402123:web:24a08d3d4877d61c34128e",
  measurementId: "G-V9CREXL8GL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
