import React from "react";
import TopNav from "../TopNav";
import { useLanguage } from "../hooks/useLanguage";
import { useHistory } from "react-router-dom";

const DownloadPage = (props) => {
  let language = useLanguage();
  let history = useHistory();
  function updateLanguageQueryParam(lang) {
    history.push(`/download?lang=${lang}`);
  }

  if (language === "fr") {
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
        <div className="pageTitle">Téléchargez les citations</div>
        <br />
        <div className="pageParagraph">
          Toutes les citations de ce portail peuvent être téléchargées en simple
          format texte gratuitement en cliquant ici:
        </div>
        <br />
        <div className="pageParagraph">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://u.pcloud.link/publink/show?code=kZgfTEkZvXSH3AYc4m5gnKxmqtxKu7vYe14X"
          >
            Téléchargez les citations
          </a>
        </div>
      </>
    );
  } else {
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
        <div className="pageTitle">Download all quotes</div>
        <br />
        <div className="pageParagraph">
          All the quotes of this portal can be downloaded in simple text format
          for free by clicking here:
        </div>
        <br />
        <div className="pageParagraph">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://u.pcloud.link/publink/show?code=kZgfTEkZvXSH3AYc4m5gnKxmqtxKu7vYe14X"
          >
            Download all quotes
          </a>
        </div>
      </>
    );
  }
};

export default DownloadPage;
