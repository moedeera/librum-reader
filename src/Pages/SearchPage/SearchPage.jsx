import { useEffect, useState } from "react";
import "./SearchPage.css";
import { Loading } from "../../Components/Loading/Loading";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase-config";

export const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const [summaries, setSummaries] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const { search } = useParams();
  const summariesData = collection(db, "summaries");
  console.log(search);

  const fetchSummariesData = async () => {
    try {
      const data = await getDocs(summariesData);
      const summariesInfo = data.docs.map((doc) => ({
        ...doc.data(),
        storyId: doc.id,
      }));

      setSummaries(summariesInfo);
      setSuggestions(summariesInfo);
    } catch (error) {
      console.log("error:", error);
      setError("Error: Please try again");

      return error;
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredSummariesData = async () => {
    try {
      // Check if searchTerm is provided
      let querySnapshot;

      // Create a query against the 'summaries' collection where 'tag' array contains 'searchTerm'
      const q = query(summariesData, where("tag", "array-contains", search));
      querySnapshot = await getDocs(q);

      const summariesInfo = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        storyId: doc.id,
      }));

      setSummaries(summariesInfo);
    } catch (error) {
      console.log("error:", error);
      // fix this
      fetchSummariesData();
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (search && search !== "all" && search !== "general") {
      fetchFilteredSummariesData();
    } else {
      fetchSummariesData();
    }
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const data = await getDocs(summariesData);
        const summariesInfo = data.docs.map((doc) => ({
          ...doc.data(),
          storyId: doc.id,
        }));

        setSuggestions(summariesInfo);
        setLoading(false);
      } catch (error) {
        console.log("error:", error);

        return error;
      }
    };

    if (summaries.length === 0) {
      fetchSuggestions();
    }
  }, [summaries]); // Only re-run the effect if 'summaries' changes

  if (loading) {
    return <Loading />;
  }

  return <div className="container"></div>;
};
