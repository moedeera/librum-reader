import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { getStorage, ref } from "firebase/storage";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

const firebaseConfig = {
  apiKey: "AIzaSyCH49nJNK0-SinR4VT6V0a-_FZsapLgtJ8",
  authDomain: "portfolio-33f0f.firebaseapp.com",
  projectId: "portfolio-33f0f",
  storageBucket: "portfolio-33f0f.appspot.com",
  messagingSenderId: "170316975789",
  appId: "1:170316975789:web:f8c5aaff8e7199f7920024",
  measurementId: "G-M0ZQL4395P",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const displayName = user.displayName;
      const photoURL = user.photoURL;
      const email = user.email;

      // Get the ID token using getIdToken

      const info = {
        name: displayName,
        pic: photoURL,
        email,
      };

      localStorage.setItem("user", JSON.stringify(info));

      console.log(info);
    })
    .catch((error) => {
      console.log(error);
    });
};

export { app, db, signInWithGoogle };
