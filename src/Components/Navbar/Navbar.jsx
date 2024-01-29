import { useContext, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FullPageNav } from "./FullPageNav/FullPageNav.jsx";
import { SiteContext } from "../../Context/Context";
import img1 from "./chevron.png";

export const Navbar = () => {
  const { menuItemsMD } = useContext(SiteContext);
  const [fullMenu, showFullMenu] = useState(false);
  const [dropdown, setDropDown] = useState(false);

  const { user, setUser } = useContext(SiteContext);
  const navigate = useNavigate();
  // console.log(user);

  return (
    <div className="navbar-container">
      <div className="navbar">
        <Link className="navbar-header" to={"/"}>
          Librum<span className="header-span">Reader</span>.
        </Link>
        <div className="navbar-menu-main">
          {user ? (
            <>
              {" "}
              {menuItemsMD.map(
                (item) =>
                  item.status !== "guest" && (
                    <Link to={item.link} key={item.id}>
                      {item.name}
                    </Link>
                  )
              )}
            </>
          ) : (
            <>
              {" "}
              {menuItemsMD.map(
                (item) =>
                  item.status !== "user" && (
                    <Link to={item.link} key={item.id}>
                      {item.name}
                    </Link>
                  )
              )}
            </>
          )}
        </div>
        <div className="menu-icon">
          <div
            onClick={() => {
              showFullMenu(true);
            }}
            className="bar bar-large bar-upper"
          ></div>
          <div className="bar bar-large bar-lower"></div>
          <div className="bar bar-small"></div>
          <div className="user-login-image">
            {" "}
            {/* <Link
              className="btn btn-primary btn-login "
              style={
                user && {
                  height: "40px",
                  width: "40px",
                  // border: "1px solid red",
                  borderRadius: "50%",
                  padding: "0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "transparent",
                }
              }
              to={user ? "/login" : "/profile"}
            >
              {user ? (
                <img
                  className="user-image"
                  style={{
                    width: "100%",
                    borderRadius: "50%",
                    maxWidth: "45px",
                  }}
                  src={user.pic}
                  alt=""
                />
              ) : (
                "Login"
              )}
            </Link> */}
            {user ? (
              <div className="user-dropdown-button">
                <div
                  onClick={() => {
                    setDropDown(!dropdown);
                    console.log(dropdown);
                  }}
                  className="user-image-container"
                >
                  {" "}
                  <img
                    className="user-image"
                    src={user.pic}
                    alt="profile-pic"
                  />
                  <div className="user-image-name">
                    {" "}
                    <small>{user.name}</small>
                    <img src={img1} alt="" />
                  </div>
                </div>
                {dropdown && (
                  <div className="user-dropdown-menu">
                    <div>
                      <Link to={"/profile"}>My Profile</Link>
                      <Link to={"/Messages"}>Messages</Link>
                      <Link to={"/Settings"}>Account</Link>
                    </div>

                    <div
                      onClick={() => {
                        setUser(null);
                        navigate("/login");
                      }}
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link className="btn" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {fullMenu && <FullPageNav showFullMenu={showFullMenu} />}
    </div>
  );
};
