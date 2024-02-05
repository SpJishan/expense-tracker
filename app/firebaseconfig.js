import { initializeApp } from "firebase/app";
import { getStorage , getDownloadUrl } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAI-mYCqOo2v8kUSWc6YjOxtxxpmXtLq24",
  authDomain: "expense-tracker-2acc4.firebaseapp.com",
  projectId: "expense-tracker-2acc4",
  storageBucket: "expense-tracker-2acc4.appspot.com",
  messagingSenderId: "868933875067",
  appId: "1:868933875067:web:6283b896e4cb468d97b9de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const imageDb = getStorage(app);
export const imgDB= getStorage(app);
export const txtDB = getFirestore(app);




