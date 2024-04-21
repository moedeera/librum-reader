import { useContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { AuthContext } from "@/Context/AuthContext";
import { db } from "../../../firebase-config";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { checkURLAvailability } from "../functions/functions";

export const useDraft = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const draftCollection = collection(db, "drafts");
  const auth = getAuth();
  const { user } = useContext(AuthContext);

  const createDraft = async (newDraft) => {
    try {
      const createdDraft = await addDoc(draftCollection, newDraft);
      console.log("successfully created draft");
    } catch (error) {
      throw new Error(error);
    }
  };

  const fetchDraft = async (slug) => {
    console.log(auth.currentUser, slug);

    if (!user || user === null) {
      console.log("no user");
      return;
    }
    console.log(auth.currentUser);
    try {
      const q = query(draftCollection, where("slug", "==", slug));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        throw new Error("No such draft exists");
      } else {
        let data = querySnapshot.docs[0].data();
        return data;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    createDraft,
    fetchDraft,
  };
};
