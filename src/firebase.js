import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc, doc, arrayUnion } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFk4wL2B4qrK25Ecmhn8H5-fUNB7Gie-A",
  authDomain: "testlog-52fb9.firebaseapp.com",
  projectId: "testlog-52fb9",
  storageBucket: "testlog-52fb9.appspot.com",
  messagingSenderId: "506706863788",
  appId: "1:506706863788:web:7279d567c4dcf73de8a109"
};

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  export { db, updateDoc, doc, arrayUnion };