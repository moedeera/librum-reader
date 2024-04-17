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
} from "firebase/firestore";
import { useAccount } from "./useAccount";

export const useStories = () => {
  const { user } = useContext(AuthContext);
  const { account } = useAccount();
  const [stories, setStories] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [fetchingStories, setFetchingStories] = useState(false);
  const [fetchingSuggestions, setFetchingSuggestions] = useState(false);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState(1);
  const [lastVisible, setLastVisible] = useState(null);

  const storiesCollection = collection(db, "stories");

  const auth = getAuth();

  const fetchSuggestions = useCallback(async () => {
    if (!account || !account.genres || account.genres.length === 0) return;
    setFetchingSuggestions(true);
    try {
      const firstGenre = account.genres[0];
      const q = query(
        storiesCollection,
        where("genres", "array-contains", firstGenre),
        limit(3)
      );
      const querySnapshot = await getDocs(q);
      const stories = querySnapshot.docs.map((doc) => doc.data());
      setSuggestions(stories);
    } catch (error) {
      setError(`Failed to fetch suggestions: ${error.message}`);
    } finally {
      setFetchingSuggestions(false);
    }
  }, [account, storiesCollection]); // Include only necessary dependencies

  const fetchStories = useCallback(async () => {
    setFetchingStories(true);
    try {
      const perPage = 6;
      let q;
      if (pagination === 1) {
        q = query(storiesCollection, limit(perPage));
      } else if (lastVisible) {
        q = query(storiesCollection, startAfter(lastVisible), limit(perPage));
      } else {
        return; // No lastVisible and pagination > 1, likely an error in usage
      }

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const newStories = querySnapshot.docs.map((doc) => doc.data());
        setStories(pagination === 1 ? newStories : [...stories, ...newStories]);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }
    } catch (error) {
      setError(`Failed to fetch stories: ${error.message}`);
    } finally {
      setFetchingStories(false);
    }
  }, [pagination, storiesCollection, lastVisible]); // Include only necessary dependencies
  useEffect(() => {
    fetchSuggestions();
    fetchStories();
  }, [fetchSuggestions, fetchStories]); // These functions now only change when necessary

  return {
    suggestions,
    stories,
    fetchingSuggestions,
    fetchingStories,
    error,
    setPagination,
    pagination,
  };
};
