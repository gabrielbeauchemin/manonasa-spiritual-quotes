import React from "react";
import Filter from "./Filter";
import Quote from "./Quote";

const ContentDesktop = (props) => {
  return (
    <div className="content">
      <div className="filters">
        <Filter
          display={props.language === "fr" ? "Auteur" : "Author"}
          values={props.authorFilters}
          onFilterChange={(authorFilters) =>
            props.updateAuthorFilters(authorFilters)
          }
        />
        <Filter
          display="Source"
          values={props.sourceFilters}
          selectedValues={props.sourceFiltersSelected}
          onFilterChange={(sourceFilters) =>
            props.updateSourceFilters(sourceFilters)
          }
        />
      </div>
      <div className="quotes">
        {props.quotes.map((quote, index) => (
          <Quote
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
  );
};

export default ContentDesktop;
