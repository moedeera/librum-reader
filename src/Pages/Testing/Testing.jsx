import "./Testing.css";

export const Testing = () => {
  return (
    <div className="container">
      <div className="testing-page">
        <div className="login-section">
          <div className="login-test">
            <h3>John Smith</h3>{" "}
            <button className="btn btn-primary">
              Login with email & password
            </button>
            <button className="btn btn-primary">Login with Google</button>
          </div>
        </div>

        <div className="account-section">
          <div className="user-account">
            <h3>Account</h3>{" "}
            <div className="account-data-section">
              <div className="account-data">Name:John Smith</div>
              <div className="account-data">Bio:London, 28 Author</div>
              <div className="account-data">status:Public</div>

              <button className="btn btn-primary">Fetch</button>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <div className="user-profile">
            <h3>Profile</h3>{" "}
            <div className="profile-stories">
              <div className="story-data">
                <p>Story 1</p>
              </div>
              <div className="story-data">
                <p>Story 2 </p>
              </div>

              <button className="btn btn-primary">Fetch</button>
            </div>
          </div>
        </div>

        <div className="story-section">
          <div className="user-profile">
            <h3>Story</h3>{" "}
            <div className="profile-stories">
              <div className="story-data">
                <p>Story 1</p>
                <small>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </small>
              </div>

              <button className="btn btn-primary">Fetch</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
