import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc, doc, arrayUnion } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBJ735rQPOTLGifwyLy69C__yxv_5GcPNg",
    authDomain: "ayccwidget.firebaseapp.com",
    projectId: "ayccwidget",
    storageBucket: "ayccwidget.appspot.com",
    messagingSenderId: "42312624927",
    appId: "1:42312624927:web:fa5093c105d589f470de2a"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  export { db, updateDoc, doc, arrayUnion };