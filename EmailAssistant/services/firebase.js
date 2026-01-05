// services/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Firebase configuration - Replace with your config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDZjbbsmYcMeFI4bGzVNkuGnBMRrsuAnuo",
  authDomain: "emailassistant-2e201.firebaseapp.com",
  databaseURL: "https://emailassistant-2e201-default-rtdb.firebaseio.com",
  projectId: "emailassistant-2e201",
  storageBucket: "emailassistant-2e201.firebasestorage.app",
  messagingSenderId: "176664163298",
  appId: "1:176664163298:web:33fd7e22a02b5ca5d43fbb",
  measurementId: "G-LFYEZH1WZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
export default app;