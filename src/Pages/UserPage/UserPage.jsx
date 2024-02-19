import { useParams } from "react-router-dom";
import "./UserPage.css";
import { useEffect, useState } from "react";
import { fetchProfile } from "../../assets/APIs/StoriesAPI";
import { Loading } from "../../Components/Loading/Loading";

export const UserPage = () => {
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const { userid } = useParams();

  useEffect(() => {
    const fetchInfo = async () => {
      const response = await fetchProfile(userid);
      setLoading(false);
      setProfile(response);
    };

    console.log(userid);
    fetchInfo();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container standard-page">
      <div className="user-page-upper-portion">
        <div className="user-page-up-banner"></div>
        <div className="user-page-up-info">
          <div className="user-page-info-avatar">
            <img src={profile.avatar} alt="" />
            <p>{profile.name}</p>
            <small>@{profile.profileName}</small>
          </div>
          <div className="user-page-info-stats">
            <div className="user-page-info-stat">6 stories</div>
            <div className="user-page-info-stat">5 followers</div>
          </div>
          <div className="user-page-info-button">
            <button className="btn">Follow</button>
          </div>
        </div>
      </div>
      <div className="user-page-lower-portion">
        <div className="user-page-lower-about">
          <h3>About</h3>
          <p>{profile.bio}</p>
        </div>
        <div className="user-page-lower-stories">
          <h4>Recent Writings</h4>
        </div>
      </div>
    </div>
  );
};
