import React, { useState } from "react";
import Filter from "./Filter";
import QuoteMobile from "./QuoteMobile";
import backIcon from "./icons/back.svg";
import plusIcon from "./icons/plus.svg";

const ContentMobile = (props) => {
  const [contentMobileActivated, setContentMobileActivated] = useState(false);
  const [nbrAuthorFiltersOn, setNbrAuthorFiltersOn] = useState(
    props.authorFilters.length
  );
  const [nbrSourceFiltersOn, setNbrSourceFiltersOn] = useState(
    props.sourceFilters.length
  );
  const nbrFiltersSelected = nbrAuthorFiltersOn + nbrSourceFiltersOn;
  return (
    <div>
      {!contentMobileActivated && (
        <div className="filtersLabelMobile">
          <b>{props.language === "fr" ? "Filtres" : "Filters"}</b>
          <img
            className="toggleFiltersMobile"
            title="search"
            alt="search"
            type="image"
            src={plusIcon}
            width="100%"
            height="100%"
            onClick={() => setContentMobileActivated(true)}
          />
          <b>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            {props.language === "fr"
              ? `(${nbrFiltersSelected} selected)`
              : `(${nbrFiltersSelected} sélectionné${
                  nbrFiltersSelected > 1 ? "s" : ""
                })`}
          </b>
        </div>
      )}
      <div className="contentMobile">
        <div className="filtersMobile">
          {contentMobileActivated && (
            <input
              className="desactivateFiltersMobile"
              title="search"
              alt="search"
              type="image"
              src={backIcon}
              width="100%"
              height="100%"
              onClick={() => setContentMobileActivated(false)}
            />
          )}

          <div
            style={{
              visibility: contentMobileActivated ? "visible" : "hidden",
              display: contentMobileActivated ? "block" : "none",
            }}
          >
            <Filter
              display={props.language === "fr" ? "Auteur" : "Author"}
              values={props.authorFilters}
              onFilterChange={(authorFilters) => {
                props.updateAuthorFilters(authorFilters);
                setNbrAuthorFiltersOn(authorFilters.length);
              }}
            />
            <Filter
              display="Book"
              values={props.sourceFilters}
              selectedValues={props.sourceFiltersSelected}
              onFilterChange={(sourceFilters) => {
                props.updateSourceFilters(sourceFilters);
                setNbrSourceFiltersOn(sourceFilters.length);
              }}
            />
          </div>
        </div>
        <div className="quotes">
          {props.quotes.map((quote, index) => (
            <QuoteMobile
              quote={quote.quote}
              author={quote.author}
              source={quote.source}
              language={quote.language}
              chapter={quote.chapter}
              number={quote.number}
              key={index}
            />
          ))}
          {props.quotes.length > 0 && !props.isRandomSearch && (
            <button
              type="button"
              className="moreQuoteButton"
              onClick={() => props.showMoreQuotes()}
              disabled={props.allQuotesFetched}
            >
              {props.language === "fr" ? "Afficher plus" : "Show more"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentMobile;
