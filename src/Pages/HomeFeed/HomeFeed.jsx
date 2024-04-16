import { useContext, useEffect, useState } from "react";
import "./HomeFeed.css";

import { Block1 } from "../../Components/Block1/Block1";
import { Block6 } from "../../Components/Block6/Block6";
import { block6HomeFeedContent } from "../../Context/Content";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/Context/AuthContext";
import { Loading } from "@/Components/Loading/Loading";

export const HomeFeed = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!user || user === null) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
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
          <h4>Some Stories you might like</h4>
          <Block1 />
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
