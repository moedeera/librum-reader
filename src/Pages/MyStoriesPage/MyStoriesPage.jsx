import { useContext, useEffect } from "react";
import "./MyStoriesPage.css";
import { SiteContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

export const MyStoriesPage = () => {
  const { profileInfo } = useContext(SiteContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!profileInfo || profileInfo === null) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="container">
      <div className="my-story-page">
        <h1>MyStoriesPage</h1>
      </div>
    </div>
  );
};
