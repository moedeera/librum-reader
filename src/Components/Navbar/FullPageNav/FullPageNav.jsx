import { useContext } from "react";
import "./FullPageNav.css";
import { SiteContext } from "../../../Context/Context";
import { Link } from "react-router-dom";
export const FullPageNav = ({ showFullMenu }) => {
  const { menuItemsLG } = useContext(SiteContext);
  return (
    <div className="full-page-navbar-container">
      <div className="full-page-navbar">
        <div className="navbar-header">
          <span className="header-span-light">Librum</span>
          <span className="header-span">Reader</span>.
        </div>
        <div
          className="navbar-close"
          onClick={() => {
            showFullMenu(false);
          }}
        >
          <div className="close-x-line segment-r"></div>
          <div className="close-x-line segment-l"></div>
        </div>
      </div>
      <div className="full-page-grid">
        {menuItemsLG.map((item) => (
          <Link
            onClick={() => {
              showFullMenu(false);
            }}
            key={item.id}
            to={item.link}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
