// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9FBUNN64nbRKBxVPLz1LJBg6qo3Iy-n4",
  authDomain: "srcelections-5abd1.firebaseapp.com",
  projectId: "srcelections-5abd1",
  storageBucket: "srcelections-5abd1.appspot.com",
  messagingSenderId: "1061769101691",
  appId: "1:1061769101691:web:44ee5714afb05dc30cfdde",
  measurementId: "G-8ND73KJVGG",
};

// Initialize Firebase
// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
