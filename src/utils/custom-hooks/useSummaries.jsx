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
} from "firebase/firestore";

export const useSummaries = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summaries, setSummaries] = useState([]);
  const [total, setTotal] = useState(0);
  const lastVisibleRef = useState(null);
  const summariesCollection = collection(db, "summaries");

  const fetchSummaries = async (
    pageIndex,
    numberOfStories,
    searchTerm = ""
  ) => {
    setLoading(true);
    setError(null);

    try {
      let q;
      const offset = pageIndex * numberOfStories;
      const summariesRef = collection(db, "summaries");

      if (searchTerm) {
        q = query(
          summariesRef,
          where("tags", "array-contains", searchTerm),
          limit(numberOfStories)
        );
      } else {
        q = query(summariesRef, limit(numberOfStories));
      }

      // Handle Pagination
      if (pageIndex > 0 && lastVisibleRef.current) {
        q = query(q, startAfter(lastVisibleRef.current));
      }

      const snapshot = await getDocs(q);
      const fetchedStories = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (snapshot.docs.length > 0) {
        lastVisibleRef.current = snapshot.docs[snapshot.docs.length - 1];
      }

      setSummaries(fetchedStories);
      setLoading(false);

      // Count total documents matching criteria (for pagination UI, not real-time)
      if (searchTerm) {
        const countQuery = query(
          summariesRef,
          where("tags", "array-contains", searchTerm)
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
      const createdSummaryRef = await addDoc(summariesCollection, newStory);
      console.log("successfully created story");
    } catch (error) {
      throw new Error("Failed to Create Document", error);
    }
  };

  // Include only necessary dependencies
  // These functions now only change when necessary

  return {
    // suggestions,

    // fetchSuggestions,
    // fetchStories,
    // error,
    // setPagination,
    // pagination,
    createSummary,
    summaries,
    loading,
    error,
    total,
    fetchSummaries,
  };
};
