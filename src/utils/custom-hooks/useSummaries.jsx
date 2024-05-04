import { useContext, useState } from "react";

import { db } from "../../../firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  startAfter,
  addDoc,
  updateDoc,
} from "firebase/firestore";

import { AuthContext } from "@/Context/AuthContext";

export const useSummaries = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summaries, setSummaries] = useState([]);
  const [total, setTotal] = useState(0);
  const lastVisibleRef = useState(null);
  const summariesCollection = collection(db, "summaries");
  const [suggestions, setSuggestions] = useState([]);

  const { user } = useContext(AuthContext);
  // Fetch summaries by index and page number
  const fetchSummaries = async (pageIndex, numberOfStories, searchTerm) => {
    console.log(lastVisibleRef);
    setLoading(true);
    setError(null);
    console.log(numberOfStories);

    try {
      let q;
      const offset = pageIndex * numberOfStories;
      const summariesRef = collection(db, "summaries");

      if (searchTerm) {
        q = query(
          summariesRef,
          where("keywords", "array-contains", searchTerm),
          limit(numberOfStories)
        );
      } else {
        q = query(summariesRef, limit(numberOfStories));
      }

      // Handle Pagination
      console.log(pageIndex, lastVisibleRef.current);

      if (pageIndex > 1 && lastVisibleRef.current) {
        q = query(q, startAfter(lastVisibleRef.current));
      }

      const snapshot = await getDocs(q);
      const fetchedStories = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(fetchedStories);
      if (snapshot.docs.length > 0) {
        lastVisibleRef.current = snapshot.docs[snapshot.docs.length - 1];
      }

      setSummaries(fetchedStories);
      setLoading(false);

      // Count total documents matching criteria (for pagination UI, not real-time)
      if (searchTerm) {
        const countQuery = query(
          summariesRef,
          where("keywords", "array-contains", searchTerm)
        );
        const countSnapshot = await getDocs(countQuery);

        setTotal(countSnapshot.docs.length);
      } else {
        const countQuery = query(summariesRef);
        const countSnapshot = await getDocs(countQuery);

        setTotal(countSnapshot.docs.length);
      }
    } catch (err) {
      console.error("Error fetching stories:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const createSummary = async (newSummary) => {
    try {
      const createdSummaryRef = await addDoc(summariesCollection, newSummary);
      console.log("successfully created story");
    } catch (error) {
      console.log(error);
      throw new Error("Failed to Create Document", error);
    }
  };

  const fetchSuggestions = async (genre, userId) => {
    let pageIndex = 1;
    const numberOfStories = 4;

    console.log(numberOfStories);

    try {
      let q;
      const summariesRef = collection(db, "summaries");

      if (genre) {
        q = query(
          summariesRef,
          where("keywords", "array-contains", genre),
          limit(numberOfStories)
        );
      } else {
        q = query(summariesRef, limit(numberOfStories));
      }

      // Handle Pagination
      console.log(pageIndex, lastVisibleRef.current);

      if (pageIndex > 1 && lastVisibleRef.current) {
        q = query(q, startAfter(lastVisibleRef.current));
      }

      const snapshot = await getDocs(q);
      const fetchedSummaries = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      let filteredSummaries = fetchedSummaries.filter(
        (summary) => summary.authorName !== user.displayName
      );

      setSuggestions(filteredSummaries);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      throw new Error(err);
    }
  };

  const quickSummaryUpdate = async (link, field, newValue) => {
    console.log(`called to update ${field}`);
    try {
      const q = query(summariesCollection, where("link", "==", link));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("No summary with that id exists");
      } else {
        // Use .ref to get the document reference from the query snapshot
        let summaryRef = querySnapshot.docs[0].ref;
        const updateObject = {};
        updateObject[field] = newValue;
        await updateDoc(summaryRef, updateObject);
        console.log(`story updated successfully.`);
      }
    } catch (error) {
      console.error("Error updating account: ", error);
      throw error; // Re-throw to allow further handling by the component
    }
  };

  return {
    suggestions,
    quickSummaryUpdate,
    fetchSuggestions,
    createSummary,
    summaries,
    loading,
    error,
    total,
    fetchSummaries,
  };
};
