import { useContext, useEffect, useState } from "react";
import "./ProfilePage.css";

import { useNavigate } from "react-router-dom";
import { BasicInfo } from "./ProfilePageComp/BasicInfo";
import { AuthContext } from "@/Context/AuthContext";
import { Loading } from "@/Components/Loading/Loading";
export const ProfilePage = () => {
  //
  const { user } = useContext(AuthContext);

  if (!user || user === null || user === undefined) {
    return (
      <div className="container">
        <Loading />;
      </div>
    );
  }

  return (
    <div className="container">
      <div className="profile-page-container">
        {" "}
        <BasicInfo />
      </div>
    </div>
  );
};
