import React, { useState, useEffect } from "react";
import TopNav from "../TopNav";
import DailyQuote from "../DailyQuote";
import { useLanguage } from "../hooks/useLanguage";
import { useHistory } from "react-router-dom";

const DailyQuotePage = (props) => {
  const language = useLanguage();
  const [quote, setQuote] = useState(undefined);
  let history = useHistory();
  function updateLanguageQueryParam(lang) {
    history.push(`/dailyQuote?lang=${lang}`);
  }

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/quotes/daily?lang=${props.language}`);
      return res.json();
    }
    let isMounted = true;
    fetchData().then((res) => {
      if (isMounted) {
        setQuote(res);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [props.language]);
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
      <div className={"pageTitle"}>
        {props.language === "fr" ? "Citation de la journée" : "Daily quote"}
      </div>
      <br />
      <br />
      {quote !== undefined && (
        <DailyQuote
          quote={quote.quote}
          author={quote.author}
          source={quote.source}
          language={quote.language}
          chapter={quote.chapter}
          number={quote.number}
        />
      )}
    </>
  );
};

export default DailyQuotePage;
