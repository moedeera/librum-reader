import { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FullPageNav } from "./FullPageNav/FullPageNav.jsx";
import { SiteContext } from "../../Context/Context";

export const Navbar = () => {
  const { menuItemsMD } = useContext(SiteContext);
  const [fullMenu, showFullMenu] = useState(false);

  const { user } = useContext(SiteContext);

  console.log(user);

  return (
    <div className="navbar-container">
      <div className="navbar">
        <Link className="navbar-header" to={"/"}>
          Librum<span className="header-span">Reader</span>.
        </Link>
        <div className="navbar-menu-main">
          {menuItemsMD.map((item) => (
            <Link to={item.link} key={item.id}>
              {item.name}
            </Link>
          ))}
          {user && <Link to={"/write"}>Write</Link>}
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
            <Link
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
            </Link>
          </div>
        </div>
      </div>

      {fullMenu && <FullPageNav showFullMenu={showFullMenu} />}
    </div>
  );
};
