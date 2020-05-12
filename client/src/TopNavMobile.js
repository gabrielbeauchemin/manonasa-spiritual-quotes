import React from "react";
import logo from "./logo.svg";
import searchIcon from "./icons/search.svg";
import backIcon from "./icons/back.svg";
import Select from "react-select";
import TopNavMenu from "./TopNavMenu";
import TopNavSearchBox from "./TopNavSearchBox";

class TopNavMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: [
        { value: "en", label: "En" },
        { value: "fr", label: "Fr" },
      ],
      selectedLanguage:
        props.language === "fr"
          ? { value: "fr", label: "Fr" }
          : { value: "en", label: "En" },
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
            <TopNavSearchBox updateSearchQuery={this.props.updateSearchQuery} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="topNavMobile">
          <div className="menuAndLogoMobile">
            <TopNavMenu language={this.state.selectedLanguage.value} />
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
          <div className="languagesSelector">
            <Select
              options={this.state.languages}
              value={[this.state.selectedLanguage]}
              onChange={(newValue, actionMeta) =>
                this.setState({ selectedLanguage: newValue })
              }
              theme={(theme) => ({
                ...theme,
                borderRadius: 2,
                colors: {
                  ...theme.colors,
                  primary25: "#EAEAEA",
                  primary: "lightgray",
                },
              })}
              styles={{
                control: (base) => ({
                  ...base,
                  height: 30,
                  minHeight: 30,
                }),
              }}
            />
          </div>
        </div>
      );
    }
  }
}

export default TopNavMobile;
