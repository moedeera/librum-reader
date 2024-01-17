import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { getStorage, ref } from "firebase/storage";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

const firebaseConfig = {
  apiKey: "AIzaSyBEOTv1kNZ_mjFEKQK2rt8hrNuP5-D5CIo",
  authDomain: "librum-bb036.firebaseapp.com",
  projectId: "librum-bb036",
  storageBucket: "librum-bb036.appspot.com",
  messagingSenderId: "739289538496",
  appId: "1:739289538496:web:ac09942d1266644fc9f225",
  measurementId: "G-JL5FYV0XWL",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const storage = getStorage(app);

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    const idToken = await user.getIdToken();

    const displayName = user.displayName;
    const photoURL = user.photoURL;
    const email = user.email;

    const info = {
      name: displayName,
      pic: photoURL,
      email,
      idToken,
    };

    localStorage.setItem("user", JSON.stringify(info));
    console.log(info);
    return info;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { app, db, signInWithGoogle, storage };
