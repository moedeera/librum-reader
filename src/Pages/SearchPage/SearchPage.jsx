import { useEffect, useState } from "react";
import "./SearchPage.css";
import { Loading } from "../../Components/Loading/Loading";

import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebase-config";
import { Block4 } from "../../Components/Block4/Block4";
import { useSummaries } from "@/utils/custom-hooks/useSummaries";

export const SearchPage = () => {
  const { loading, summaries, error, total, fetchSummaries } = useSummaries();
  useEffect(() => {
    fetchSummaries(0, 6); // Example: Fetch first page with 6 stories containing 'fiction'
  }, []);

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
