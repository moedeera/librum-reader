import { useContext, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FullPageNav } from "./FullPageNav/FullPageNav.jsx";
import { SiteContext } from "../../Context/Context";
import img1 from "./chevron.png";
import OutsideClickHandler from "react-outside-click-handler";
import { SearchBar } from "../SearchBar/SearchBar.jsx";

export const Navbar = () => {
  const { menuItemsMD, dropDownLinks } = useContext(SiteContext);
  const [fullMenu, showFullMenu] = useState(false);
  const [dropdown, setDropDown] = useState(false);

  const { user, setUser, profileInfo } = useContext(SiteContext);
  const navigate = useNavigate();

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
          )}{" "}
          <SearchBar />
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
            {user ? (
              <OutsideClickHandler
                onOutsideClick={() => {
                  setDropDown(false);
                }}
              >
                <div className="user-dropdown-button">
                  <div
                    onClick={() => {
                      setDropDown(!dropdown);
                    }}
                    className="user-image-container"
                  >
                    {" "}
                    <img
                      className="user-image"
                      src={profileInfo.avatar}
                      alt="profile-pic"
                    />
                    <div className="user-image-name">
                      {" "}
                      <small>{profileInfo.profileName}</small>
                      <img src={img1} alt="" />
                    </div>
                  </div>
                  {dropdown === true ? (
                    <div className="user-dropdown-menu">
                      <div>
                        {dropDownLinks.map((link) => (
                          <Link
                            onClick={() => {
                              setDropDown(false);
                            }}
                            key={link.id}
                            to={link.to}
                          >
                            {link.name}
                          </Link>
                        ))}
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
                  ) : (
                    ""
                  )}
                </div>
              </OutsideClickHandler>
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
