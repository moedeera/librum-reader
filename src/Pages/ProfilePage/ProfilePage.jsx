import "./ProfilePage.css";
import { Link } from "react-router-dom";
import { BasicInfo } from "./ProfilePageComp/BasicInfo";
export const ProfilePage = () => {
  return (
    <div className="container">
      <div className="profile-page-container">
        <div className="profile-page-segment">
          <h4>Messages</h4>
          <div className="latest">
            <p></p>
            <button className="btn btn-primary">Read Latest</button>
          </div>
          <div className="all">
            <Link to={"/"} className="btn btn-primary">
              See All
            </Link>
          </div>
        </div>
        <div className="profile-page-segment">
          <h4>Reset Password</h4>
          <p>Current Password</p>
          <input type="text" placeholder="Enter current password" />
          <p>New Password </p>
          <input type="password" placeholder="Enter current password" />
          <p>Re-enter New Password</p>
          <input type="text" placeholder="Enter current password" />
          <button className="btn btn-primary">Reset</button>
        </div>

        <BasicInfo />

        <div className="profile-page-segment"></div>
        <div className="profile-page-view"></div>
      </div>
    </div>
  );
};
