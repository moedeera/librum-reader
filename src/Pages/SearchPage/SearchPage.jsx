import { useContext, useEffect } from "react";
import "./SearchPage.css";
import { Loading } from "../../Components/Loading/Loading";

import { Link, useParams } from "react-router-dom";

import { useSummaries } from "@/utils/custom-hooks/useSummaries";
import { SiteContext } from "@/Context/Context";
import { Block4c } from "@/Components/Block4/Block4c";

export const SearchPage = () => {
  const { storySummaries, setStorySummaries, currentPage } =
    useContext(SiteContext);
  const { searchWord } = useParams();

  const {
    loading,
    total,
    fetchSummaries,
    fetchFilteredSummaries,
    fetchNextSetOfSummaries,
  } = useSummaries();

  // page index buttons
  let pageButtons = [];

  if (total && storySummaries) {
    console.log(total, storySummaries.length);
    const totalPages = Math.ceil(total / storySummaries?.length);

    for (var j = 1; j <= totalPages; j++) {
      pageButtons.push({ id: j, page: j });
    }
  }

  const getNextSet = async () => {
    try {
      const newSummaries = await fetchNextSetOfSummaries();
      setStorySummaries(newSummaries);
      console.log(newSummaries);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getSummaries = async () => {
      // console.log("called");
      if (searchWord === "all" || searchWord === "") {
        console.log("condition 1 ");
        try {
          console.log("condition 1 attempt");
          const data = await fetchSummaries();
          console.log(data);
          setStorySummaries(data);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("condition 2");
        const data = await fetchFilteredSummaries(searchWord);
        setStorySummaries(data);
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

  if (
    loading ||
    storySummaries === null ||
    !Array.isArray(storySummaries || storySummaries === undefined)
  ) {
    return <Loading />;
  }

  return (
    <div className="container standard-page">
      <div className="page-header">
        <h3>Stories </h3>
        <div
          className="btn"
          onClick={() => {
            getNextSet();
          }}
        >
          Fetch More
        </div>
      </div>
      <div className="search-page">
        {storySummaries.length > 0 ? (
          <>
            {" "}
            <Block4c summaries={storySummaries} loading={loading} />
          </>
        ) : (
          <>
            <h4>Sorry, No stories matching that keyword</h4>
          </>
        )}

        <div>
          Showing {storySummaries.length} of {total} results
        </div>

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
