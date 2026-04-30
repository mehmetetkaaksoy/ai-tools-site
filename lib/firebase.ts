import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjXS9mbWeR7gKTIpcTs9l11TbWbgz3LeU",
  authDomain: "ai-tools-site-d94b9.firebaseapp.com",
  projectId: "ai-tools-site-d94b9",
  storageBucket: "ai-tools-site-d94b9.firebasestorage.app",
  messagingSenderId: "646489002138",
  appId: "1:646489002138:web:cc605424bb677c323d4f23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);