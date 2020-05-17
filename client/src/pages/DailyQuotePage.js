import React, { useState, useEffect } from "react";
import TopNav from "../TopNav";
import DailyQuote from "../DailyQuote";
import { useLanguage } from "../hooks/useLanguage";

const DailyQuotePage = (props) => {
  const language = useLanguage(props.language);
  const [quote, setQuote] = useState(undefined);

  async function fetchData() {
    const res = await fetch("/quotes/daily");
    return res.json();
  }
  useEffect(() => {
    let isMounted = true;
    fetchData().then((res) => {
      if (isMounted) {
        setQuote(res);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <>
      <TopNav
        updateSearchQuery={props.updateSearchQuery}
        updateLanguage={props.updateLanguage}
        language={language}
        keywords={props.searchQuery}
      />
      <div className="pageTitle">{props.language === "fr" ? "Citation de la journée" : "Daily quote"}</div>
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
