import { useContext, useEffect, useState } from "react";
import "./HomeFeed.css";

import { Block6 } from "../../Components/Block6/Block6";
import { block6HomeFeedContent } from "../../Context/Content";

import { AuthContext } from "@/Context/AuthContext";
import { Loading } from "@/Components/Loading/Loading";
import { useAccount } from "@/utils/custom-hooks/useAccount";

export const HomeFeed = () => {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(null);
  const [fetchingSuggestions, setFetchingSuggestions] = useState(false);

  const { fetchAccount, createAccount } = useAccount();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTheAccount = async () => {
      setLoading(true);
      try {
        const res = await fetchAccount();
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

  if (loading || account === null) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="home-feed-page">
        <h3>
          Welcome back{" "}
          <span style={{ color: "goldenrod" }}>{user?.displayName}</span>{" "}
        </h3>
        <div className="home-feed-stories">
          {fetchingSuggestions ? (
            <h4>Loading</h4>
          ) : (
            <>
              <h4>Some Stories you might like</h4>
              {/* <Block1 input={suggestions} /> */}
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
