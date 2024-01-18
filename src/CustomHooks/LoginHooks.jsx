import { useEffect, useState } from "react";
import { app, db, signInWithGoogle } from "../../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

function useGoogleSignIn(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const userInfo = await signInWithGoogle();

    setLoading(true);
    setError(null);
  };

  return { data, loading, error, fetchData };
}
