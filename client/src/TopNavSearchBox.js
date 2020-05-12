import React, { useState } from "react";
import searchIcon from "./icons/search.svg";
import searchRandomIcon from "./icons/searchRandom.svg";
import { Redirect } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const TopNavSearchBox = (props) => {
  const [redirectSearchQuotes, setRedirectSearchQuotes] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRandomSearch, setIsRandomSearch] = useState(false);
  const isMobile = useMediaQuery({
    query: "(max-device-width: 600px)",
  });
  const searchBoxClass = isMobile ? "searchBoxMobile" : "searchBox";
  if (redirectSearchQuotes) {
    return <Redirect to="/" />;
  }
  return (
    <form
      className={searchBoxClass}
      onSubmit={(e) => {
        if (window.location.pathname !== "/") {
          setRedirectSearchQuotes(true);
        } else {
          props.updateSearchQuery(searchQuery, isRandomSearch);
        }
        e.preventDefault();
      }}
    >
      <input
        autoFocus
        type="text"
        alt=""
        placeholder="Search Spiritual Quotes"
        name="search"
        style={{ paddingLeft: "8px" }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <input
        className="searchIcon"
        title="search"
        alt="search"
        type="image"
        src={searchIcon}
        width="100%"
        height="100%"
        onClick={() => setIsRandomSearch(false)}
      />
      <input
        className="searchIcon"
        title="search randomly"
        alt="search randomly"
        type="image"
        width="100%"
        height="100%"
        src={searchRandomIcon}
        onClick={() => setIsRandomSearch(true)}
      />
    </form>
  );
};

export default TopNavSearchBox;
