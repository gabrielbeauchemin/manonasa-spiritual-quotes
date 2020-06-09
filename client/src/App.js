import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import DownloadPage from "./pages/DownloadPage";
import ContactPage from "./pages/ContactPage";
import DailyQuotePage from "./pages/DailyQuotePage";
import QuotesPage from "./pages/QuotesPage";

//https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    // eslint-disable-next-line
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function App() {
  const [searchId, setsearchId] = useState(uuidv4());
  const [searchQuery, setSearchQuery] = useState("");
  const [isRandomSearch, setIsRandomSearch] = useState(true);
  const [language, setLanguage] = useState(undefined);

  function updateSearchQuery(searchQuery, isRandomSearch) {
    setsearchId(uuidv4());
    setSearchQuery(searchQuery);
    setIsRandomSearch(isRandomSearch);
  }

  function updateLanguage(languageUpdated) {
    if (languageUpdated !== language) {
      setIsRandomSearch(false);
      setLanguage(languageUpdated);
    }
  }

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/about"
          component={() => (
            <AboutPage
              updateSearchQuery={updateSearchQuery}
              updateLanguage={updateLanguage}
              searchQuery={searchQuery}
              language={language}
            />
          )}
        />
        <Route
          exact
          path="/download"
          component={() => (
            <DownloadPage
              updateSearchQuery={updateSearchQuery}
              updateLanguage={updateLanguage}
              searchQuery={searchQuery}
              language={language}
            />
          )}
        />
        <Route
          exact
          path="/contact"
          component={() => (
            <ContactPage
              updateSearchQuery={updateSearchQuery}
              updateLanguage={updateLanguage}
              searchQuery={searchQuery}
              language={language}
            />
          )}
        />
        <Route
          exact
          path="/dailyQuote"
          component={() => (
            <DailyQuotePage
              updateSearchQuery={updateSearchQuery}
              updateLanguage={updateLanguage}
              searchQuery={searchQuery}
              language={language}
            />
          )}
        />
        <Route exact path="/">
          <QuotesPage
            updateSearchQuery={updateSearchQuery}
            updateLanguage={updateLanguage}
            searchId={searchId}
            searchQuery={searchQuery}
            isRandomSearch={isRandomSearch}
            language={language}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
