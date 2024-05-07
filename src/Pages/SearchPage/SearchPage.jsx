import { useEffect, useState } from "react";
import "./SearchPage.css";
import { Loading } from "../../Components/Loading/Loading";

import { Link, useParams } from "react-router-dom";
import { Block4 } from "../../Components/Block4/Block4";
import { useSummaries } from "@/utils/custom-hooks/useSummaries";

export const SearchPage = () => {
  const { searchWord } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    loading,
    summaries,
    total,
    fetchSummaries,
    fetchFilteredSummaries,
    fetchTheNextSetOfSummaries,
  } = useSummaries();
  const [paginationData, setPaginationData] = useState({
    total: null,
    last: null,
  });

  // page index buttons
  let pageButtons = [];
  // useEffect(() => {
  //   console.log(summaries);
  // }, [summaries]);

  if (total && summaries) {
    console.log(total, summaries.length);
    const totalPages = Math.ceil(total / summaries?.length);

    for (var j = 1; j <= totalPages; j++) {
      pageButtons.push({ id: j, page: j });
    }
  }

  useEffect(() => {
    const getSummaries = async () => {
      if (searchWord === "all" || searchWord === "") {
        fetchSummaries();
      } else {
        fetchFilteredSummaries(searchWord);
      }
    };
    getSummaries();
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

        {/* {total > summaries.length && (
          <button
            className="btn"
            onClick={() => {
              fetchSummaries(1, 8, searchWord);
            }}
          >
            Show More
          </button>
        )} */}
        <div className="page-button-container">
          {" "}
          {pageButtons.map((pageButton) => (
            <div
              key={pageButton.id}
              className=" btn-pages"
              onClick={() => {
                if (pageButton.page === currentPage) {
                  console.log("you are on tht page");
                  return;
                }
                console.log(
                  "page",
                  pageButton.page,
                  ", search-term:",
                  searchWord
                );
                fetchSummaries(
                  pageButton.page,
                  searchWord,
                  paginationData.last
                );
              }}
            >
              {pageButton.page}
            </div>
          ))}
        </div>

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
