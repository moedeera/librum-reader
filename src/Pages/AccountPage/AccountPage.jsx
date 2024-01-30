import { useContext, useEffect, useState } from "react";
import "./AccountPage.css";
import { MessagesBox } from "../ProfilePage/ProfilePageComp/MessagesBox";
import { PasswordReset } from "../ProfilePage/ProfilePageComp/PasswordReset";
import { BasicInfo } from "../ProfilePage/ProfilePageComp/BasicInfo";
import { DeleteProfile } from "../ProfilePage/ProfilePageComp/DeleteProfile";
import { useNavigate } from "react-router-dom";
import { SiteContext } from "../../Context/Context";

export const AccountPage = () => {
  const [mode, setMode] = useState("writings");
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
