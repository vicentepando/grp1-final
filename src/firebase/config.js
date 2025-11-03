import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAjEEEUvlXs101ylBbVA87XpNh2yE2cmVw",
  authDomain: "grp1-final.firebaseapp.com",
  projectId: "grp1-final",
  storageBucket: "grp1-final.firebasestorage.app",
  messagingSenderId: "339389516073",
  appId: "1:339389516073:web:42992e6fbf0e2abd850f38"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();