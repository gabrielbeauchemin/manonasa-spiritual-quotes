import React from "react";
import TopNav from "../TopNav";
import { useLanguage } from "../hooks/useLanguage";

const DownloadPage = (props) => {
  let language = useLanguage(props.language);
  if (language === "fr") {
    return (
      <>
        <TopNav
          updateSearchQuery={props.updateSearchQuery}
          updateLanguage={props.updateLanguage}
          language={language}
          keywords={props.searchQuery}
        />
        <div className="pageTitleLarge">Téléchargez les citations</div>
        <br />
        <div className="pageParagraph">
          Toutes les citations de ce portail peuvent être téléchargées en simple
          format texte gratuitement en cliquant ici:
        </div>
        <br />
        <div className="pageParagraph">
          <a target="_blank" rel="noopener noreferrer" href="https://u.pcloud.link/publink/show?code=kZgfTEkZvXSH3AYc4m5gnKxmqtxKu7vYe14X">Téléchargez les citations</a>
        </div>
      </>
    );
  } else {
    return (
      <>
        <TopNav
          updateSearchQuery={props.updateSearchQuery}
          updateLanguage={props.updateLanguage}
          language={language}
          keywords={props.searchQuery}
        />
        <div className="pageTitleLarge">Download all quotes</div>
        <br />
        <div className="pageParagraph">
          All the quotes of this portal can be downloaded in simple text format
          for free by clicking here:
        </div>
        <br />
        <div className="pageParagraph">
          <a target="_blank" rel="noopener noreferrer" href="https://u.pcloud.link/publink/show?code=kZgfTEkZvXSH3AYc4m5gnKxmqtxKu7vYe14X">Download all quotes</a>
        </div>
      </>
    );
  }
};

export default DownloadPage;
