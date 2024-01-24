import { useContext } from "react";
import "./HomeFeed.css";
import { SiteContext } from "../../Context/Context";
import { Block1 } from "../../Components/Block1/Block1";

export const HomeFeed = () => {
  const { profileInfo } = useContext(SiteContext);
  console.log(profileInfo);
  return (
    <div className="container">
      <div className="home-feed-page">
        <h3>Welcome back {profileInfo.name}</h3>
        <div className="home-feed-stories">
          <h4>Some Stories you might like</h4>
          <Block1 />
        </div>
        <div className="home-feed-updates"></div>
        <div className="home-feed-create"></div>
        <div className="home-feed-suggestions"></div>
      </div>
    </div>
  );
};
