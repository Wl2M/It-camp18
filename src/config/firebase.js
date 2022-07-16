import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDLLFWrMrBYWhg1GHHBV2PqgLumeLjQHEM",
    authDomain: "work-12efa.firebaseapp.com",
    projectId: "work-12efa",
    storageBucket: "work-12efa.appspot.com",
    messagingSenderId: "711546832301",
    appId: "1:711546832301:web:c881d355d7107705e8cd24"
  };

const app = firebase.initializeApp(firebaseConfig).firestore();

export default app;