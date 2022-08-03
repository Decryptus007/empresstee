// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCC2SDEBavty0Ysm1rGfQKWCyNLTwUSr0w",
  authDomain: "fir-frontend-74b33.firebaseapp.com",
  projectId: "fir-frontend-74b33",
  storageBucket: "fir-frontend-74b33.appspot.com",
  messagingSenderId: "1017599442167",
  appId: "1:1017599442167:web:615afc2cf78b0dec4fe7f2",
  measurementId: "G-5N7LJFG661"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
export const storage = getStorage(app)