import { Block4 } from "../../Components/Block4/Block4";
import "./Stories.css";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Loading } from "../../Components/Loading/Loading";

export const Stories = () => {
  const [summaries, setSummaries] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(8);
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
  console.log(summaries);
  if (error) {
    return (
      <div className="container">
        {" "}
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="stories-page">
        {" "}
        {summaries.length > 0 ? (
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
        {summaries.length > 0 ? (
          <Block4
            summaries={summaries}
            loading={loading}
            showingAmount={showMore}
          />
        ) : (
          <div className="stories-page-suggestion">
            {!loading && <h3>Give these stories a try</h3>}
            <Block4
              summaries={suggestions}
              loading={loading}
              showingAmount={showMore}
            />
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
