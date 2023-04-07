// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQcbbsBwl702V8rqKLzthI3K-htLulcsU",
  authDomain: "whispr-e3191.firebaseapp.com",
  projectId: "whispr-e3191",
  storageBucket: "whispr-e3191.appspot.com",
  messagingSenderId: "184165819971",
  appId: "1:184165819971:web:92764f8138ce3eed28d6f6",
  measurementId: "G-YQR3QZ7L54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
