import { useContext, useEffect } from "react";
import "./HomeFeed.css";
import { SiteContext } from "../../Context/Context";
import { Block1 } from "../../Components/Block1/Block1";
import { Block6 } from "../../Components/Block6/Block6";
import { block6HomeFeedContent } from "../../Context/Content";
import { useNavigate } from "react-router-dom";

export const HomeFeed = () => {
  const navigate = useNavigate();

  const { profileInfo, user } = useContext(SiteContext);
  useEffect(() => {
    if (!user || user === null || !profileInfo || profileInfo === null) {
      navigate("/");
    }
  }, []);
  return (
    <div className="container">
      <div className="home-feed-page">
        <h3>Welcome back {profileInfo.name}</h3>
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
