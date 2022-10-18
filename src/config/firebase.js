import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBY7zvf3f8h7JdH2-iWZ1_lZgNJeaKWPE",
  authDomain: "persist-ai-client-portal.firebaseapp.com",
  databaseURL: "https://persist-ai-client-portal-default-rtdb.firebaseio.com",
  projectId: "persist-ai-client-portal",
  storageBucket: "persist-ai-client-portal.appspot.com",
  messagingSenderId: "283759597777",
  appId: "1:283759597777:web:9d3dd64f031701f5b78df0",
  measurementId: "G-8K6KL2YCQR"
};

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

connectFirestoreEmulator(db, 'localhost', 8080);
connectAuthEmulator(auth, "http://localhost:9099");