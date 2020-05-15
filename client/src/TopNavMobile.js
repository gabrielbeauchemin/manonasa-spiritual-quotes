import React from "react";
import logo from "./logo.svg";
import searchIcon from "./icons/search.svg";
import backIcon from "./icons/back.svg";
import TopNavMenu from "./TopNavMenu";
import TopNavSearchBox from "./TopNavSearchBox";
import LanguageSelector from "./LanguageSelector";

class TopNavMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBoxActivated: false,
    };
  }

  render() {
    if (this.state.searchBoxActivated) {
      return (
        <div style={{ display: "flex" }}>
          <input
            className="desactivateSearchIcon"
            title="search"
            alt="search"
            type="image"
            src={backIcon}
            width="100%"
            height="100%"
            onClick={() =>
              this.setState({
                searchBoxActivated: !this.state.searchBoxActivated,
              })
            }
          />
          <div className="topNavMobileSearchActivated">
            <TopNavSearchBox
              updateSearchQuery={this.props.updateSearchQuery}
              keywords={this.props.keywords}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="topNavMobile">
          <div className="menuAndLogoMobile">
            <TopNavMenu language={this.props.language} />
            <div className="logo">
              <a href="/">
                <img src={logo} alt="" width="100%" height="100%" />
              </a>
            </div>
          </div>
          <div className="searchBoxToggle">
            <input
              title="search"
              alt="search"
              type="image"
              src={searchIcon}
              width="100%"
              height="100%"
              onClick={() =>
                this.setState({
                  searchBoxActivated: !this.state.searchBoxActivated,
                })
              }
            />
          </div>
          <LanguageSelector updateLanguage={this.props.updateLanguage} language={this.props.language} />
        </div>
      );
    }
  }
}

export default TopNavMobile;
