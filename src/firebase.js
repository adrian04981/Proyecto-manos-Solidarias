// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; // Importa el módulo de Realtime Database

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDeRN_5dqpel_D0oA_GnB3A-OZsEWNKlt4",
  authDomain: "navidad-bsf.firebaseapp.com",
  databaseURL: "https://navidad-bsf-default-rtdb.firebaseio.com",
  projectId: "navidad-bsf",
  storageBucket: "navidad-bsf.firebasestorage.app",
  messagingSenderId: "1061288161631",
  appId: "1:1061288161631:web:f324b247a1c5a52f7d86ea",
  measurementId: "G-3VNMKPCCZ3"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app); // Inicializa Realtime Database

// Exporta el objeto `app` y cualquier servicio necesario
export { app, analytics, database };
