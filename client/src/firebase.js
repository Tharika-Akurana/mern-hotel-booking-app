// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-hotel-booking-app-8f88d.firebaseapp.com",
  projectId: "mern-hotel-booking-app-8f88d",
  storageBucket: "mern-hotel-booking-app-8f88d.appspot.com",
  messagingSenderId: "940638865663",
  appId: "1:940638865663:web:cd322ea8674a5f982ca4ca"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);