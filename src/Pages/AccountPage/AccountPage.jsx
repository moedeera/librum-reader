import { useState } from "react";
import "./AccountPage.css";

export const AccountPage = () => {
  const [mode, setMode] = useState("writings");
  return (
    <div className="container">
      <div className="account-page-container">
        <div className="account-page-banner">
          <div className="account-page-profile-pic"></div>
          <div className="account-page-name"></div>
        </div>
        <div className="account-page-view">
          <div
            onClick={() => {
              setMode("writings");
            }}
          >
            Your Writings
          </div>
          <div
            onClick={() => {
              setMode("stats");
            }}
          >
            Your Stats
          </div>
        </div>
        <div className="account-page-box">
          <div className="account-page-stories">Stories</div>
          <div className="account-page-stats">Stats</div>
        </div>
      </div>
    </div>
  );
};
