import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const config = {
    apiKey: "AIzaSyDBbjWZHHl1-_TWlXtFT4bw9WzkT1elMKU",
    authDomain: "photographer-696c8.firebaseapp.com",
    projectId: "photographer-696c8",
    storageBucket: "photographer-696c8.appspot.com",
    messagingSenderId: "732085608516",
    appId: "1:732085608516:web:132a9cf8c68d490bd85c11",
    measurementId: "G-ZXJ80EPWTH"
};
export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
      throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.js');
    } else {
      return config;
    }
  }
export const app = initializeApp(config);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);