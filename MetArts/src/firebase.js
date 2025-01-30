// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore,doc,setDoc} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "meta-draw.firebaseapp.com",
  projectId: "meta-draw",
  storageBucket: "meta-draw.firebasestorage.app",
  messagingSenderId: "503667980836",
  appId: "1:503667980836:web:ad72e41e4c3f23246eb6b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);
