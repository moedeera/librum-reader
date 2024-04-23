import { useContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { AuthContext } from "@/Context/AuthContext";
import { db } from "../../../firebase-config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { randomLiterature, getRandomItem } from "@/Pages/AuthPage.js/Content";

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

  const fetchDraftById = async (draftId) => {
    try {
      const draftRef = doc(db, "drafts", draftId); // Create a reference to the draft document
      const draftDoc = await getDoc(draftRef); // Get the document

      if (draftDoc.exists()) {
        console.log("Draft data:", draftDoc.data()); // Output the data of the draft
        return draftDoc.data(); // Return the data for further use
      } else {
        console.log("No such draft found!");
        return null; // Return null or handle as needed if the draft does not exist
      }
    } catch (error) {
      console.error("Error fetching draft:", error);
      return null; // Return null or throw an error as needed
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
    fetchDraftById,
  };
};
