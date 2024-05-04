import { useEffect } from "react";
import "./SearchPage.css";
import { Loading } from "../../Components/Loading/Loading";

import { Link, useParams } from "react-router-dom";
import { Block4 } from "../../Components/Block4/Block4";
import { useSummaries } from "@/utils/custom-hooks/useSummaries";

export const SearchPage = () => {
  const { searchWord } = useParams();

  const { loading, summaries, total, fetchSummaries } = useSummaries();
  useEffect(() => {
    if (searchWord === "all") {
      fetchSummaries(1, 8);
      console.log(total);
    } else {
      fetchSummaries(1, 8, searchWord);
      console.log(total);
    }
    // Example: Fetch first page with 6 stories containing 'fiction'
  }, [searchWord]);

  const tags = [
    "crime",
    "science",
    "business",
    "fantasy",
    "fiction",
    "mystery",
    "adventure",
  ];

  if (loading || summaries === null) {
    return <Loading />;
  }

  return (
    <div className="container standard-page">
      <div className="page-header">
        <h3>Stories</h3>
      </div>
      <div className="search-page">
        {summaries.length > 0 ? (
          <>
            {" "}
            <Block4 summaries={summaries} loading={loading} />
          </>
        ) : (
          <>
            <h4>Sorry, No stories matching that keyword</h4>
          </>
        )}

        <div>
          Showing {summaries.length} of {total} results
        </div>

        {total > summaries.length && (
          <button
            className="btn"
            onClick={() => {
              fetchSummaries(1, 8, searchWord);
            }}
          >
            Show More
          </button>
        )}

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
