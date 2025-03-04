import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDQnVQql70vPitr9xuu0HUmlCvVjUHdjLw",
  authDomain: "manos-solidarias-bsf.firebaseapp.com",
  databaseURL: "https://manos-solidarias-bsf-default-rtdb.firebaseio.com",
  projectId: "manos-solidarias-bsf",
  storageBucket: "manos-solidarias-bsf.firebasestorage.app",
  messagingSenderId: "1006157711223",
  appId: "1:1006157711223:web:959288d37219db4bb18372"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };