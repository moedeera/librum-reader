import { useContext, useEffect } from "react";
import { MessagesBox } from "../ProfilePage/ProfilePageComp/MessagesBox";
import { SiteContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

export const MessagesPage = () => {
  const { profileInfo, setProfileInfo } = useContext(SiteContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!profileInfo || profileInfo === null) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="container">
      <div className="messages-page">
        <MessagesBox profile={profileInfo} setProfile={setProfileInfo} />
      </div>
    </div>
  );
};
