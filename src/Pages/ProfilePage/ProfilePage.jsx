import { useContext, useEffect } from "react";
import "./ProfilePage.css";

import { BasicInfo } from "./ProfilePageComp/BasicInfo";
import { DeleteProfile } from "./ProfilePageComp/DeleteProfile";
import { MessagesBox } from "./ProfilePageComp/MessagesBox";
import { PasswordReset } from "./ProfilePageComp/PasswordReset";
import { SiteContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
export const ProfilePage = () => {
  //
  const { user, setUser, profileInfo, setProfileInfo } =
    useContext(SiteContext);

  const navigate = useNavigate();
  useEffect(() => {
    console.log(user, profileInfo);
    if (!user || user === null || !profileInfo || profileInfo === null) {
      navigate("/login");
      return;
    }
  }, [user, navigate]);
  return (
    <div className="container">
      <div className="profile-page-container">
        <MessagesBox profile={profileInfo} setProfile={setProfileInfo} />
        <PasswordReset profile={profileInfo} setProfile={setProfileInfo} />
        <BasicInfo profile={profileInfo} setProfile={setProfileInfo} />
        <DeleteProfile profile={profileInfo} setProfile={setProfileInfo} />
        <button
          onClick={() => {
            localStorage.removeItem("librum-user");
            setUser(null);
          }}
          className="btn btn-primary"
        >
          {" "}
          Logout
        </button>
      </div>
    </div>
  );
};
