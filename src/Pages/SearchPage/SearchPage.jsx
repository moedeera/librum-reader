import { useEffect, useState } from "react";
import "./SearchPage.css";
import { Loading } from "../../Components/Loading/Loading";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebase-config";
import { Block4 } from "../../Components/Block4/Block4";

export const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const [summaries, setSummaries] = useState([]);
  const [suggestions, setSuggestions] = useState(false);
  const [error, setError] = useState("");
  const { searchWord } = useParams();
  const summariesData = collection(db, "summaries");

  const fetchSummariesData = async () => {
    try {
      const q = query(summariesData, where("public", "==", true));
      const data = await getDocs(q);
      const summariesInfo = data.docs.map((doc) => ({
        ...doc.data(),
        storyId: doc.id,
      }));

      return summariesInfo;
    } catch (error) {
      console.log("error:", error);
      setError("Error: Please try again");
      return error;
    }
  };

  const fetchFilteredSummariesData = async () => {
    try {
      // Check if searchTerm is provided
      let querySnapshot;

      // Create a query against the 'summaries' collection where 'tag' array contains 'searchTerm'
      const q = query(
        summariesData,
        where("tag", "array-contains", searchWord),
        where("public", "==", true)
      );
      querySnapshot = await getDocs(q);

      const summariesInfo = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        storyId: doc.id,
      }));

      return summariesInfo;
    } catch (error) {
      console.log("error:", error);
      // fix this
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let postsData = [];
      setSuggestions(false);
      setLoading(true);
      try {
        if (searchWord === "all" || searchWord === "general") {
          postsData = await fetchSummariesData();
        } else if (searchWord) {
          // Assumes searchWord is not null, 'all', or 'general'

          postsData = await fetchFilteredSummariesData();
        }

        // Check if postsData is still empty, then fetch suggested posts
        if (postsData.length === 0) {
          try {
            const data = await getDocs(summariesData);
            postsData = data.docs.map((doc) => ({
              ...doc.data(),
              storyId: doc.id,
            }));

            setSuggestions(true);
          } catch (error) {
            console.log(error);
            setError(error);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSummaries(postsData);
        setLoading(false);
      }
    };

    fetchData().catch(console.error); // Handle errors appropriately in your real implementation
  }, [searchWord]); // This effect depends on searchWord
  const tags = [
    "crime",
    "science",
    "business",
    "fantasy",
    "fiction",
    "mystery",
    "adventure",
  ];
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="search-page">
        <h4>
          {suggestions && (
            <>
              <div>
                <span style={{ color: "black" }}>Sorry, no matches for</span>{" "}
                <span>{`"${searchWord}"`}</span>
              </div>
            </>
          )}
        </h4>{" "}
        {suggestions ? (
          <h4>Trending Stories</h4>
        ) : (
          <h4 style={{ textTransform: "capitalize" }}>
            {searchWord !== "all" && searchWord !== "general"
              ? searchWord
              : "Trending"}{" "}
            stories
          </h4>
        )}
        <Block4 summaries={summaries} loading={loading} />
        <div className="search-page-filter">
          <p>Categories:</p>
          <div className="search-page-tags-container">
            {" "}
            {tags.map((tag, index) => (
              <Link
                to={`/browse/${tag}`}
                key={index}
                className="search-page-tag"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
