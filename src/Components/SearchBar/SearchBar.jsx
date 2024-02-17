import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import "./SearchBar.css";
import img from "./search-icon.png";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSearch = () => {
    // Redirect the user
    navigate(`/browse/${searchTerm}`);
    setSearchTerm("");
  };

  const handleKeyPress = (event) => {
    // Check for the "Enter" key press
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-main">
        <div className="search-bar-icon" onClick={handleSearch}>
          <img src={img} alt="magnifying glass icon" />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="search-bar-input"
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          value={searchTerm}
        />
      </div>
      <div className="search-bar-drop-down"></div>
    </div>
  );
};
