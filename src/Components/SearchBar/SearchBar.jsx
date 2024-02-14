import "./SearchBar.css";
import img from "./search-icon.png";

export const SearchBar = ({ size }) => {
  return (
    <div className="search-bar-container">
      <div className="search-bar-main">
        <div className="search-bar-icon">
          <img src={img} alt="magnifying glass icon" />
        </div>
        <input type="text" placeholder="Search" className="search-bar-input" />
      </div>
      <div className="search-bar-drop-down"></div>
    </div>
  );
};
