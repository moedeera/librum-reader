import { useContext, useState } from "react";
import { db } from "../../../firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  startAfter,
  updateDoc,
  orderBy,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { AuthContext } from "@/Context/AuthContext";

export const useSummaries = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summaries, setSummaries] = useState([]);
  const [total, setTotal] = useState(0);
  // Corrected state for last visible reference
  const [suggestions, setSuggestions] = useState([]);
  const [lastVisibleSummary, setLastVisibleSummary] = useState(null);
  const [filteredSummaries, setFilteredSummaries] = useState([]);
  const [lastVisibleFilteredSummary, setLastVisibleFilteredSummary] =
    useState(null);

  const summariesCollection = collection(db, "summaries");

  const { user } = useContext(AuthContext);

  // Fetch the top summaries based on views
  const fetchSummaries = async () => {
    setLoading(true);
    setError(null);

    try {
      const summariesRef = collection(db, "summaries");
      const q = query(summariesRef, orderBy("views", "desc"), limit(16));
      const snapshot = await getDocs(q);

      const fetchedSummaries = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (fetchedSummaries.length > 0) {
        setSummaries(fetchedSummaries);
        setLastVisibleSummary(snapshot.docs[snapshot.docs.length - 1]);
        setTotal(snapshot.docs.length);
      }
      setLoading(false);
      return fetchedSummaries;
    } catch (err) {
      console.error("Error fetching summaries:", err);
      setError(err.message);
      setLoading(false);
    }
  };
  //Fetch filtered summaries
  const fetchFilteredSummaries = async (keyword) => {
    setLoading(true);
    setError(null);

    const q = query(
      summariesCollection,
      where("keywords", "array-contains", keyword)
    );
    const snapshotTotal = await getDocs(q); // Query to fetch all for counting
    // Set the total number of items matching the search
    setTotal(snapshotTotal.docs.length);
    try {
      const summariesRef = collection(db, "summaries");

      const q = query(
        summariesRef,
        where("keywords", "array-contains", keyword),
        limit(16)
      );
      const snapshot = await getDocs(q);

      const fetchedSummaries = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (fetchedSummaries.length > 0) {
        setSummaries(fetchedSummaries);
        setLastVisibleFilteredSummary(snapshot.docs[snapshot.docs.length - 1]);
      }
      return fetchedSummaries;
      setLoading(false);
    } catch (err) {
      console.error("Error fetching filtered summaries:", err);
      setError(err.message);
      setLoading(false);
    }
  };
  // Fetch next page of filtered summaries
  const fetchTheNextSetOfSummaries = async (searchWord, lastVisibleItem) => {
    setLoading(true);
    setError(null);

    try {
      const summariesRef = collection(db, "summaries");
      const q = query(
        summariesRef,
        where("keywords", "array-contains", searchWord),
        startAfter(lastVisibleItem),
        limit(16)
      );
      const snapshot = await getDocs(q);

      const fetchedSummaries = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (fetchedSummaries.length > 0) {
        setSummaries(fetchedSummaries);
        setLastVisibleFilteredSummary(snapshot.docs[snapshot.docs.length - 1]);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching next set of summaries:", err);
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

  const deleteSummary = async (url) => {
    try {
      const q = query(summariesCollection, where("url", "==", url));
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
    suggestions,
    quickSummaryUpdate,
    fetchSuggestions,
    createSummary,
    summaries,
    loading,
    error,
    total,
    fetchSummaries,
    fetchFilteredSummaries,
    filteredSummaries,
    fetchTheNextSetOfSummaries,
    lastVisibleFilteredSummary,
    deleteSummary,
  };
};
