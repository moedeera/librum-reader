import { useContext, useEffect } from "react";
import "./ProfilePage.css";

import { SiteContext } from "../../Context/Context";
import { useNavigate, useParams } from "react-router-dom";
export const ProfilePage = () => {
  const { userid } = useParams();
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
    if ((userid === "librum" && user) || (userid === "" && user)) {
      navigate(`/profiles/${user.name}`);
    }
  }, [user, navigate]);
  return <div className="container"></div>;
};
