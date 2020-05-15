import React from "react";
import logo from "./logo.svg";
import TopNavMenu from "./TopNavMenu";
import TopNavSearchBox from "./TopNavSearchBox";
import LanguageSelector from "./LanguageSelector";

class TopNavBigScreen extends React.Component {
  render() {
    return (
      <div className="topNavBigScreen">
        <div className="menuAndLogo">
          <TopNavMenu language={this.props.language} />
          <div className="logo">
            <a href="/">
              <img src={logo} alt="" width="100%" height="100%" />
            </a>
          </div>
        </div>

        <TopNavSearchBox
          updateSearchQuery={this.props.updateSearchQuery}
          keywords={this.props.keywords}
        />

        <LanguageSelector updateLanguage={this.props.updateLanguage} language={this.props.language} />
      </div>
    );
  }
}

export default TopNavBigScreen;
