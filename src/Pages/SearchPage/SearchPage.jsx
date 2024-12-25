import { useContext, useEffect, useState } from "react";
import "./SearchPage.css";
import { Loading } from "../../Components/Loading/Loading";

import { Link, useParams } from "react-router-dom";

import { useSummaries } from "@/utils/custom-hooks/useSummaries";
import { SiteContext } from "@/Context/Context";
import { Block4c } from "@/Components/Block4/Block4c";
import { filterObjectsByString, getTopTags } from "@/utils/functions/functions";

export const SearchPage = () => {
  const { storySummaries, setStorySummaries, currentPage } =
    useContext(SiteContext);
  const { searchWord } = useParams();
  const [topTags, setTopTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [fetchedSummaries, setFetchedSummaries] = useState([]);
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
      setFetchedSummaries(newSummaries);
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
          setFetchedSummaries(data);
          const listOfTopTags = getTopTags(data);
          console.log(listOfTopTags);
          setTopTags(listOfTopTags);
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
      </div>

      <div className="search-page-filter">
        <p>Filter by Category:</p>
        <div className="search-page-tags-container">
          {" "}
          {topTags.map((tag, index) => (
            <div
              key={index}
              className={
                selectedTag === tag.name
                  ? "search-page-tag search-page-tag-selected "
                  : "search-page-tag"
              }
              onClick={() => {
                if (selectedTag !== tag.name) {
                  const filteredSummaries = filterObjectsByString(
                    fetchedSummaries,
                    tag.name
                  );
                  setStorySummaries(filteredSummaries);
                  setSelectedTag(tag.name);
                } else {
                  setStorySummaries(fetchedSummaries);
                  setSelectedTag(null);
                }
              }}
            >
              {tag.name} ({tag.occurrence})
            </div>
          ))}
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
        <div className="load-more-container">
          {" "}
          {storySummaries.length === total || selectedTag ? (
            "No more results"
          ) : (
            <>
              {" "}
              <div
                className="btn"
                onClick={() => {
                  getNextSet();
                }}
              >
                Load More {total}
              </div>
            </>
          )}{" "}
        </div>
      </div>
    </div>
  );
};
