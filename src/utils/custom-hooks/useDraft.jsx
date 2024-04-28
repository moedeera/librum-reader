import { useContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { AuthContext } from "@/Context/AuthContext";
import { db, storage } from "../../../firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { randomLiterature, getRandomItem } from "@/Pages/AuthPage.js/Content";
import { getPathFromUrl } from "../functions/functions";
import { deleteObject, ref } from "firebase/storage";

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
        // Output the data of the draft
        return draftDoc.data(); // Return the data for further use
      } else {
        console.log("No such draft found!");
        throw new Error("Error Fetching draft"); // Return null or handle as needed if the draft does not exist
      }
    } catch (error) {
      console.error("Error fetching draft:", error);
      throw new Error("Error Fetching draft"); // Return null or throw an error as needed
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

  // const deleteDraft = async (draftId) => {
  //   try {
  //     setLoading(true);
  //     const draftRef = doc(db, "drafts", draftId);
  //     await deleteDoc(draftRef);
  //     console.log("Successfully deleted draft");
  //     setLoading(false);
  //   } catch (error) {
  //     setError("Failed to delete draft: " + error.message);
  //     setLoading(false);
  //     throw new Error(error);
  //   }
  // };

  const updateDraft = async (draftId, updates) => {
    try {
      setLoading(true); // Set loading to true at the start of the operation
      const draftRef = doc(draftCollection, draftId); // Create a reference to the draft document
      const draftDoc = await getDoc(draftRef); // Get the document snapshot

      if (!draftDoc.exists()) {
        throw new Error("No such draft exists");
      } else {
        await updateDoc(draftRef, updates); // Pass the updates object directly
        console.log(`Draft ${draftId} updated successfully.`);
      }
    } catch (error) {
      // Update error state with the error message
      throw error("Error updating draft: " + error.message); // Re-throw the error for further handling
    }
  };

  const deleteImage = async (imageUrl) => {
    try {
      const imagePath = getPathFromUrl(imageUrl);
      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef);
      console.log("File deleted successfully");
    } catch (error) {
      console.error("Error removing file: ", error);
    }
  };

  const deleteDraft = async (draftId) => {
    try {
      const draftRef = doc(db, "drafts", draftId);
      await deleteDoc(draftRef);
      console.log("Draft deleted successfully!");
      // Optionally, you can handle any post-deletion logic here (e.g., updating state or UI)
    } catch (error) {
      console.error("Error deleting draft:", error);
      // Optionally, handle errors in UI, such as displaying an error message
    }
  };

  return {
    createDraft,
    fetchDraft,
    fetchDraftById,
    deleteDraft,
    updateDraft,
    deleteImage,
  };
};
