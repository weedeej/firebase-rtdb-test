// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-3tyAPqw74nDhULiCtBWq_x4Y3XzuICA",
  authDomain: "d-resto-813d3.firebaseapp.com",
  databaseURL: "https://d-resto-813d3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "d-resto-813d3",
  storageBucket: "d-resto-813d3.appspot.com",
  messagingSenderId: "511962110161",
  appId: "1:511962110161:web:fb068dff3614bd90d18df0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase();
export const storage = getStorage();