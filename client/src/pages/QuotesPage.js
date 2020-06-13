import React from "react";
import TopNav from "../TopNav";
import QuotesContent from "../QuotesContent";
import { useLanguage } from "../hooks/useLanguage";
import { useHistory } from "react-router-dom";

const QuotesPage = (props) => {
  let language = useLanguage();
  let history = useHistory();
  function updateLanguageQueryParam(lang) {
    history.push(`/?lang=${lang}`);
  }
  return (
    <>
      <TopNav
        updateSearchQuery={props.updateSearchQuery}
        updateLanguage={(lang) => {
          if (lang !== props.language) {
            updateLanguageQueryParam(lang);
            props.updateLanguage(lang);
          }
        }}
        language={language}
        keywords={props.searchQuery}
      />
      <QuotesContent
        language={language}
        searchId={props.searchId}
        searchQuery={props.searchQuery}
        isRandomSearch={props.isRandomSearch}
      />
    </>
  );
};

export default QuotesPage;
