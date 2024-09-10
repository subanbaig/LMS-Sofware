// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDN-lCARB-3pc9JDdzPXtyQ1STNLBkjLwY",
  authDomain: "lms-software-73360.firebaseapp.com",
  projectId: "lms-software-73360",
  storageBucket: "lms-software-73360.appspot.com",
  messagingSenderId: "688949813613",
  appId: "1:688949813613:web:81185338294c229dce3a64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth , db};