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
  const { user, setUser } = useContext(SiteContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user || user === null) {
      navigate("/login");
      // return;
    }
  }, [user, navigate]);
  return (
    <div className="container">
      <div className="profile-page-container">
        <MessagesBox />
        <PasswordReset />
        <BasicInfo />
        <DeleteProfile />
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
