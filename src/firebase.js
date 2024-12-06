// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeRN_5dqpel_D0oA_GnB3A-OZsEWNKlt4",
  authDomain: "navidad-bsf.firebaseapp.com",
  projectId: "navidad-bsf",
  storageBucket: "navidad-bsf.firebasestorage.app",
  messagingSenderId: "1061288161631",
  appId: "1:1061288161631:web:f324b247a1c5a52f7d86ea",
  measurementId: "G-3VNMKPCCZ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);