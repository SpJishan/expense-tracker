// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR9WP7UfW9o0UYQvpLqfb_LzdlnMTj6I4",
  authDomain: "imagedb-ef613.firebaseapp.com",
  projectId: "imagedb-ef613",
  storageBucket: "imagedb-ef613.appspot.com",
  messagingSenderId: "846482583554",
  appId: "1:846482583554:web:1a8d7e48635c16309ab71b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)