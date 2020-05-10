import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import DownloadPage from "./pages/DownloadPage";
import ContactPage from "./pages/ContactPage";
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

  function updateSearchQuery(searchQuery, isRandomSearch) {
    setsearchId(uuidv4());
    setSearchQuery(searchQuery);
    setIsRandomSearch(isRandomSearch);
  }

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/about"
          component={() => <AboutPage updateSearchQuery={updateSearchQuery} />}
        />
        <Route
          exact
          path="/download"
          component={() => (
            <DownloadPage updateSearchQuery={updateSearchQuery} />
          )}
        />
        <Route
          exact
          path="/contact"
          component={() => (
            <ContactPage updateSearchQuery={updateSearchQuery} />
          )}
        />
        <Route exact path="/">
          <QuotesPage
            updateSearchQuery={updateSearchQuery}
            searchId={searchId}
            searchQuery={searchQuery}
            isRandomSearch={isRandomSearch}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
