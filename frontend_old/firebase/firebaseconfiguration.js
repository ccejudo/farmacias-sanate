import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuRGFa0-JJgFmv-l7bnYWS-ZMLEOYOXFk",
  authDomain: "integratorlogin.firebaseapp.com",
  projectId: "integratorlogin",
  storageBucket: "integratorlogin.appspot.com",
  messagingSenderId: "1011461415064",
  appId: "1:1011461415064:web:ceec54783567e22f54b0ed"
};

let instance;

export default function getFirebase() {
  if (typeof window !== "undefined") {
    if (instance) return instance;
    instance = firebase.initializeApp(firebaseConfig);
    return instance;
  }
  return null;
}
