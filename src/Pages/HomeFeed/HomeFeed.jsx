import { useContext, useEffect, useState } from "react";
import "./HomeFeed.css";

import { Block6 } from "../../Components/Block6/Block6";
import { block6HomeFeedContent } from "../../Context/Content";

import { AuthContext } from "@/Context/AuthContext";
import { Loading } from "@/Components/Loading/Loading";
import { useAccount } from "@/utils/custom-hooks/useAccount";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { Homepage } from "../Homepage/Homepage";
import { Block1 } from "@/Components/Block1/Block1";
import { useSummaries } from "@/utils/custom-hooks/useSummaries";
import { Block4 } from "@/Components/Block4/Block4";

export const HomeFeed = () => {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(null);
  const [fetchingSuggestions, setFetchingSuggestions] = useState(false);

  const { fetchAccount } = useAccount();
  const { fetchSuggestions, suggestions } = useSummaries();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTheAccount = async () => {
      setLoading(true);
      try {
        const res = await fetchAccount();
        console.log(res.genres);

        console.log(res);
        setAccount(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTheAccount();
  }, [user]);

  useEffect(() => {
    console.log("account check", account?.genres);
    if (account?.genres) {
      if (account.genres?.length > 0) {
        fetchSuggestions(account?.genres[0], account.userId);
      } else {
        fetchSuggestions(null, account.userId);
      }
    }
  }, [account]);

  if (loading || account === null) {
    return <Loading />;
  }

  if (!user) {
    return <Homepage />;
  }

  return (
    <div className="container">
      <div className="home-feed-page">
        <h3>
          Welcome back{" "}
          <span style={{ color: "goldenrod" }}>{user?.displayName}</span>{" "}
        </h3>
        <div className="home-feed-stories">
          {suggestions.length === 0 ? (
            <> </>
          ) : suggestions.length > 0 ? (
            <>
              <h4>Some Stories you might like</h4>
              <Block4 summaries={suggestions} />
            </>
          ) : (
            <>
              {" "}
              <h4>Loading</h4>
            </>
          )}
        </div>
        <div className="home-feed-updates">
          <h4>Stay up to date</h4>
          <Block6 input={block6HomeFeedContent} alt={1} />
        </div>
        <div className="home-feed-create"></div>
        <div className="home-feed-suggestions"></div>
      </div>
    </div>
  );
};
