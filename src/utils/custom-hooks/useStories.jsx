import { useContext, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { AuthContext } from "@/Context/AuthContext";
import { db, signInWithGoogle } from "../../../firebase-config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export const useStories = () => {
  const { setCurrentUser, setCurrentProfile, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const storiesCollection = collection(db, "stories");

  const auth = getAuth();

  // login with email and password
  const fetchSuggestions = async (genre) => {
    console.log(user);

    try {
      const q = query(
        storiesCollection,
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        const account = await addDoc(storiesCollection, {
          userId: user.uid,
          messages: [],
          drafts: [],
          genres: [],
          bookmarks: [],
        });
        return account;
      } else {
        let data = querySnapshot.docs[0].data();
        return data;
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  // login/register with google

  // register with email and password
  // User Registration/ Create new user profile

  return {
    fetchSuggestions,
  };
};
