import React from "react";
import logo from "./logo.svg";
import Select from "react-select";
import TopNavMenu from "./TopNavMenu";
import TopNavSearchBox from "./TopNavSearchBox";

class TopNavDesktop extends React.Component {
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
      redirectSearchQuotes: false,
    };
  }

  render() {
    return (
      <div className="topNavLaptop">
        <div className="menuAndLogo">
          <TopNavMenu language={this.state.selectedLanguage.value} />
          <div className="logo">
            <a href="/">
              <img src={logo} alt="" width="100%" height="100%" />
            </a>
          </div>
        </div>

        <TopNavSearchBox updateSearchQuery={this.props.updateSearchQuery} />

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
          />
        </div>
      </div>
    );
  }
}

export default TopNavDesktop;
