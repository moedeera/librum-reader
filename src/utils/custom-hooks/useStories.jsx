import { useContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { AuthContext } from "@/Context/AuthContext";
import { db } from "../../../firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

export const useStories = () => {
  const storiesCollection = collection(db, "stories");

  const auth = getAuth();
  const { user } = useContext(AuthContext);
  const [stories, setStories] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [fetchingStories, setFetchingStories] = useState(false);
  const [fetchingSuggestions, setFetchingSuggestions] = useState(false);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState(1);
  const [lastVisible, setLastVisible] = useState(null);

  // create a story
  const createStory = async (newStory) => {
    try {
      const createdStoryRef = await addDoc(storiesCollection, newStory);
      console.log("successfully created story", createdStoryRef);
      return createdStoryRef;
    } catch (error) {
      throw new Error("Failed to Create Document", error);
    }
  };

  // fetch a story by the url
  const fetchStory = async (url) => {
    try {
      const q = query(storiesCollection, where("url", "==", url));
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

  // update story
  const updateStory = async (url, updatedStory) => {
    try {
      // Set loading to true at the start of the operation
      const storyRef = doc(storiesCollection, url); // Create a reference to the draft document
      const storyDoc = await getDoc(storyRef); // Get the document snapshot

      if (!storyDoc.exists()) {
        throw new Error("No such story exists");
      } else {
        await updateDoc(storyRef, updatedStory); // Pass the updates object directly
        console.log(`Story with url "${url}" was updated successfully.`);
      }
    } catch (error) {
      // Update error state with the error message
      throw new error("Error updating story:", error); // Re-throw the error for further handling
    }
  };

  // quick update of a story ** does not need original story fetched
  const quickStoryUpdate = async (url, field, newValue) => {
    console.log(`called to update ${field}`);
    try {
      const q = query(storiesCollection, where("url", "==", url));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("No story with that id exists");
      } else {
        // Use .ref to get the document reference from the query snapshot
        let storyRef = querySnapshot.docs[0].ref;
        const updateObject = {};
        updateObject[field] = newValue;
        await updateDoc(storyRef, updateObject);
        console.log(`story updated successfully.`);
      }
    } catch (error) {
      console.error("Error updating account: ", error);
      throw error; // Re-throw to allow further handling by the component
    }
  };
  // delete story
  const deleteStory = async (url) => {
    try {
      const q = query(storiesCollection, where("url", "==", url));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        throw new Error("No such story exists");
      } else {
        const docRef = querySnapshot.docs[0].ref; // Get the DocumentReference
        await deleteDoc(docRef); // Use DocumentReference with deleteDoc
        console.log("Successfully deleted story");
      }
    } catch (error) {
      console.error("Error deleting story: ", error.message);
      throw new Error(error.message); // Re-throw if necessary, otherwise handle it here
    }
  };

  return {
    fetchStory,
    quickStoryUpdate,
    updateStory,
    createStory,
    deleteStory,
  };
};
