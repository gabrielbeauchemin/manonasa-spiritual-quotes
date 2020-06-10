import React, { useState, useEffect, useRef } from "react";
import searchIcon from "./icons/search.svg";
import searchRandomIcon from "./icons/searchRandom.svg";
import { Redirect } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Snackbar from "./Snackbar";

const TopNavSearchBox = (props) => {
  const [redirectSearchQuotes, setRedirectSearchQuotes] = useState(false);
  const [searchQuery, setSearchQuery] = useState(props.keywords || "");
  const [isRandomSearch, setIsRandomSearch] = useState(false);
  const snackbarRef = useRef(null);
  const isMobile = useMediaQuery({
    query: "(max-device-width: 600px)",
  });
  const searchBoxClass = isMobile ? "searchBoxMobile" : "searchBox";

  useEffect(() => {
    if (redirectSearchQuotes) {
      props.updateSearchQuery(searchQuery, isRandomSearch);
    }
  }, [redirectSearchQuotes, searchQuery, isRandomSearch, props]);

  if (redirectSearchQuotes) {
    return <Redirect to={"/?lang=" + props.language} />;
  }
  return (
    <>
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
          placeholder={
            props.language === "fr"
              ? "Chercher des citations de spiritualité"
              : "Search Spiritual Quotes"
          }
          name="search"
          style={{ paddingLeft: "8px" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          className="searchIcon"
          title={props.language === "fr" ? "Chercher" : "Search"}
          alt="search"
          type="image"
          src={searchIcon}
          width="100%"
          height="100%"
          onClick={() => setIsRandomSearch(false)}
        />
        <input
          className="searchIcon"
          title={
            props.language === "fr"
              ? "Recherche de citations aléatoires"
              : "Search of random quotes"
          }
          alt="search randomly"
          type="image"
          width="100%"
          height="100%"
          src={searchRandomIcon}
          onClick={() => {
            setIsRandomSearch(true);
            snackbarRef.current.openSnackBar(
              props.language === "fr" ? "Recherche de citations aléatoires" : "Search of random quotes"
            );
          }}
        />
      </form>
      <Snackbar ref={snackbarRef} />
    </>
  );
};

export default TopNavSearchBox;
