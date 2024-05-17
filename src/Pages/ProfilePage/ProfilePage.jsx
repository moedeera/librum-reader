import { useContext, useEffect } from "react";
import "./ProfilePage.css";

import { SiteContext } from "../../Context/Context";
import { useNavigate, useParams } from "react-router-dom";
import { BasicInfo } from "./ProfilePageComp/BasicInfo";
export const ProfilePage = () => {
  const { userid } = useParams();
  //
  const { user, profileInfo } = useContext(SiteContext);

  const navigate = useNavigate();
  useEffect(() => {
    console.log(user, profileInfo);
    if (!user || user === null) {
      navigate("/login");
      return;
    }
  }, [user, navigate]);
  return (
    <div className="container">
      <div className="profile-page-container">
        {" "}
        <BasicInfo />
      </div>
    </div>
  );
};
