import React, { useState } from "react";
import Filter from "./Filter";
import QuoteMobile from "./QuoteMobile";
import closeIcon from "./icons/close.svg";
import plusIcon from "./icons/plus.svg";

const ContentMobile = (props) => {
  const [contentMobileActivated, setContentMobileActivated] = useState(false);
  const disableFilters = () => {
    props.updateAuthorFilters(props.authorFilters);
    props.updateSourceFilters(props.sourceFilters);
    setContentMobileActivated(false);
  };
  return (
    <div>
      {!contentMobileActivated && (
        <div className="filtersLabelMobile">
          <b>Filters</b>
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
              src={closeIcon}
              width="100%"
              height="100%"
              onClick={() => disableFilters()}
            />
          )}
          {contentMobileActivated && (
            <>
              <Filter
                display={props.language === "fr" ? "Auteur" : "Author"}
                values={props.authorFilters}
                onFilterChange={(authorFilters) =>
                  props.updateAuthorFilters(authorFilters)
                }
              />
              <Filter
                display="Book"
                values={props.sourceFilters}
                selectedValues={props.sourceFiltersSelected}
                onFilterChange={(sourceFilters) =>
                  props.updateSourceFilters(sourceFilters)
                }
              />
            </>
          )}
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
