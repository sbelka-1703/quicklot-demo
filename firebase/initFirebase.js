// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1FAk9tpMwW27Ax6X7_Je6TGoLCC1Kr2k",
  authDomain: "hcg-lot-exp.firebaseapp.com",
  projectId: "hcg-lot-exp",
  storageBucket: "hcg-lot-exp.appspot.com",
  messagingSenderId: "493314842301",
  appId: "1:493314842301:web:060ac53c45d128f638e1d4",
  measurementId: "G-EF36YB7GSQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)