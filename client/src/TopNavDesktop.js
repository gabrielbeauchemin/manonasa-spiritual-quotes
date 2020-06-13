import React from "react";
import logo from "./logo.svg";
import TopNavMenu from "./TopNavMenu";
import TopNavSearchBox from "./TopNavSearchBox";
import LanguageSelector from "./LanguageSelector";

class TopNavDesktop extends React.Component {
  render() {
    return (
      <div className="topNavDesktop">
        <div className="menuAndLogo">
          <TopNavMenu language={this.props.language} />
          <div className="logo">
            <a href={`/?lang=${this.props.language}`}>
              <img src={logo} alt="" width="100%" height="100%" />
            </a>
          </div>
        </div>

        <TopNavSearchBox updateSearchQuery={this.props.updateSearchQuery} language={this.props.language}/>

        <LanguageSelector updateLanguage={this.props.updateLanguage} language={this.props.language} />
      </div>
    );
  }
}

export default TopNavDesktop;
