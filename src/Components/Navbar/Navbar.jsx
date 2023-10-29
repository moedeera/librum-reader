import { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { SiteContext } from "../../Context/Context";

export const Navbar = () => {
  const { menuItemsMD, menuItemsLG } = useContext(SiteContext);

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-header">
          Librum<span>Reader</span>
        </div>
        <div className="navbar-menu-main">
          {menuItemsMD.map((item) => (
            <Link to={item.link} key={item.id}>
              {item.name}
            </Link>
          ))}
        </div>
        <div className="menu-icon">
          <div className="bar bar-large bar-upper"></div>
          <div className="bar bar-large bar-lower"></div>
          <div className="bar bar-small"></div>
        </div>
      </div>
    </div>
  );
};
