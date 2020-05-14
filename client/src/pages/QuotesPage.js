import React from "react";
import TopNav from "../TopNav";
import QuotesContent from "../QuotesContent";
import { useLanguage } from "../hooks/useLanguage";

const QuotesPage = (props) => {
  let language = useLanguage();
  return (
    <>
      <TopNav
        updateSearchQuery={props.updateSearchQuery}
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
