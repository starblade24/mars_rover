import React from "react";
import "./searchbar.css";

const SearchBar = ({ label, value, handleChange }) => {
  return (
    <div className="search-bar-container">
      <label style={{ marginRight: "10px" }}>{label}</label>
      <input
        type="text"
        placeholder="Search here"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default SearchBar;