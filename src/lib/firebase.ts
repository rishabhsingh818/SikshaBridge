// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "shikshaai-8yzoa",
  "appId": "1:1084976696859:web:b2c2eea3e304921e1bf2be",
  "storageBucket": "shikshaai-8yzoa.firebasestorage.app",
  "apiKey": "AIzaSyAfqyw21oo7jz0o3pdjBV9uk28WV3P5BD8",
  "authDomain": "shikshaai-8yzoa.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "1084976696859"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
