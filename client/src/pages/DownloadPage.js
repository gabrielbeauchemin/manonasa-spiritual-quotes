import React from "react";
import TopNav from "../TopNav";
import { useLanguage } from "../useLanguage";

const DownloadPage = (props) => {
  let language = useLanguage();
  if (language === "fr") {
    return (
      <>
        <TopNav updateSearchQuery={props.updateSearchQuery} />
        <div className="pageTitleDownload">Téléchargez les citations</div>
        <br />
        <div className="pageParagraph">
          Toutes les citations de ce portail peuvent être téléchargées en simple
          format texte gratuitement en cliquant ici:
        </div>
        <br />
        <div className="pageParagraph">
          <a href="test.com">Téléchargez les citations</a>
        </div>
      </>
    );
  } else {
    return (
      <>
        <TopNav updateSearchQuery={props.updateSearchQuery} />
        <div className="pageTitleDownload">Download all quotes</div>
        <br />
        <div className="pageParagraph">
          All the quotes of this portal can be downloaded in simple text format
          for free by clicking here:
        </div>
        <br />
        <div className="pageParagraph">
          <a href="test.com">Download all quotes</a>
        </div>
      </>
    );
  }
};

export default DownloadPage;
