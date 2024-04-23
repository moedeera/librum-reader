import { Link, useParams } from "react-router-dom";
import "./UserPage.css";
import { useContext, useEffect, useState } from "react";

import { Loading } from "../../Components/Loading/Loading";
import { findImageSet, imagesSorted } from "../../assets/images/images";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { useProfile } from "@/utils/custom-hooks/useProfile";
import { AuthContext } from "@/Context/AuthContext";

export const UserPage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { userid } = useParams();
  const { getProfile } = useProfile();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await getProfile(userid);
        setProfile(response);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    console.log(user, profile);
    fetchInfo();
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="container standard-page">
      <div className="user-page-upper-portion">
        <div className="user-page-up-banner"></div>
        <div className="user-page-up-info">
          <div className="user-page-info-avatar">
            <img src={profile.avatar} alt="" />
            <p>{profile.name}</p>
            <small>@{profile.url}</small>
          </div>
          <div className="user-page-info-stats">
            <div className="user-page-info-stat">
              {profile.stories.length} stories
            </div>
            <div className="user-page-info-stat">
              {profile.followers.length} followers
            </div>
          </div>{" "}
          {user.url !== userid && (
            <div className="user-page-info-button">
              <button className="btn">Follow</button>
            </div>
          )}
        </div>
      </div>
      <div className="user-page-lower-portion">
        <div className="user-page-lower-about">
          <h4>About</h4>
          <p>{profile.bio}</p>
        </div>
        <div className="user-page-lower-stories">
          <h4>Recent Writings</h4>
          <div className="recent-writings-container">
            {profile.stories.map((story, index) => (
              <Link
                to={`../story/${story.id}`}
                key={index}
                className="recent-writings-item"
              >
                <div
                  className="recent-writings-image-container"
                  style={{ backgroundImage: `url(${story.pic})` }}
                ></div>

                <p>{story.title}</p>
                <div className="recent-writing-item-bio">{story.summary}</div>
                <div className="recent-stats-container">
                  <div className="recent-story-stat">
                    16{" "}
                    <img src={findImageSet("icons", imagesSorted)[0]} alt="" />
                  </div>
                  <div className="recent-story-stat">
                    5{" "}
                    <img src={findImageSet("icons", imagesSorted)[1]} alt="" />
                  </div>
                  <div className="recent-story-stat">
                    1{" "}
                    <img src={findImageSet("icons", imagesSorted)[2]} alt="" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
