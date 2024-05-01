import { useContext, useState, useEffect, useCallback } from "react";
import { getAuth } from "firebase/auth";
import { AuthContext } from "@/Context/AuthContext";
import { db } from "../../../firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  startAfter,
  addDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useAccount } from "./useAccount";

export const useStories = () => {
  const storiesCollection = collection(db, "stories");
  const auth = getAuth();

  const [stories, setStories] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [fetchingStories, setFetchingStories] = useState(false);
  const [fetchingSuggestions, setFetchingSuggestions] = useState(false);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState(1);
  const [lastVisible, setLastVisible] = useState(null);
  const { user } = useContext(AuthContext);

  // create a story
  const createStory = async (newStory) => {
    try {
      const createdStoryRef = await addDoc(storiesCollection, newStory);
      console.log("successfully created story");
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

  return {
    fetchStory,
    quickStoryUpdate,
    createStory,
  };
};
