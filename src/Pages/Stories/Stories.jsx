import { Block4 } from "../../Components/Block4/Block4";
import "./Stories.css";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Loading } from "../../Components/Loading/Loading";

export const Stories = () => {
  const [matches, setMatches] = useState(true);
  const [summaries, setSummaries] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(8);

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
      setLoading(false);
    } catch (error) {
      console.log("error:", error);

      return error;
    }
  };

  const fetchFilteredSummariesData = async () => {
    try {
      // Check if searchTerm is provided
      let querySnapshot;
      if (search) {
        // Create a query against the 'summaries' collection where 'tag' array contains 'searchTerm'
        const q = query(summariesData, where("tag", "array-contains", search));
        querySnapshot = await getDocs(q);
      } else {
        // If no searchTerm, fetch all documents
        querySnapshot = await getDocs(summariesData);
      }

      const summariesInfo = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        storyId: doc.id,
      }));

      setSummaries(summariesInfo);
      setLoading(false);
    } catch (error) {
      console.log("error:", error);
      return error;
    }
  };

  useEffect(() => {
    if (search && search !== null && search !== "all" && search !== "general") {
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
      setMatches(false);
      fetchSuggestions();
    } else {
      setMatches(true);
    }
  }, [summaries]); // Only re-run the effect if 'summaries' changes

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="stories-page">
        {" "}
        {matches ? (
          <h3>
            {" "}
            <span style={{ textTransform: "capitalize" }}>{search}</span>{" "}
            Stories
          </h3>
        ) : (
          <h3>
            {!loading && <span>No story matches for {`"${search}"`}</span>}
          </h3>
        )}
        <div className="stories-page-filter-section"></div>
        {matches ? (
          <Block4 summaries={summaries} loading={loading} more={showMore} />
        ) : (
          <div className="stories-page-suggestion">
            {!loading && <h3>Give these stories a try</h3>}
            <Block4 summaries={suggestions} loading={loading} more={showMore} />
          </div>
        )}
        {summaries.length + suggestions.length > showMore ? (
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowMore(showMore + 4);
            }}
          >
            More
          </button>
        ) : (
          <> No More to show </>
        )}
      </div>
    </div>
  );
};
