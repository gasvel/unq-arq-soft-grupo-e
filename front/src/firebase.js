// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
export default function(){
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBVwJk4DI_k64X4sTyoFcG6uxvI_qnJk-Q",
    authDomain: "unq-arq-soft-1-grupo-e.firebaseapp.com",
    projectId: "unq-arq-soft-1-grupo-e",
    storageBucket: "unq-arq-soft-1-grupo-e.appspot.com",
    messagingSenderId: "1064909149315",
    appId: "1:1064909149315:web:42677b0348548404f2f7b6",
    measurementId: "G-MLY1S1NYFG"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
}