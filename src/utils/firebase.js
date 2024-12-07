// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRit89bd6-87ddS8seOSmWCGLWwY3Cew0",
  authDomain: "netflix-gpt-99ec2.firebaseapp.com",
  projectId: "netflix-gpt-99ec2",
  storageBucket: "netflix-gpt-99ec2.firebasestorage.app",
  messagingSenderId: "375705636440",
  appId: "1:375705636440:web:402b757298e3c3d0bf442d",
  measurementId: "G-SDD72KQ3G4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
