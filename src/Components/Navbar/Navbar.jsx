import { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FullPageNav } from "./FullPageNav/FullPageNav.jsx";
import { SiteContext } from "../../Context/Context";

export const Navbar = () => {
  const { menuItemsMD } = useContext(SiteContext);
  const [fullMenu, showFullMenu] = useState(false);

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
          <Link className="btn btn-primary btn-login" to={"/login"}>
            Login
          </Link>
        </div>
      </div>

      {fullMenu && <FullPageNav showFullMenu={showFullMenu} />}
    </div>
  );
};
