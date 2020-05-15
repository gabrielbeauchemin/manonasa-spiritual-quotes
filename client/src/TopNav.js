import React from "react";
import TopNavDesktop from "./TopNavDesktop";
import TopNavBigScreen from "./TopNavBigScreen";
import TopNavMobile from "./TopNavMobile";
import { useMediaQuery } from "react-responsive";

const TopNav = (props) => {
  const isBigScreen = useMediaQuery({ query: "(min-device-width: 1824px)" });
  const isDesktopOrTablet = useMediaQuery({
    query: "(min-device-width: 600px)",
  });

  if (isBigScreen) {
    return (
      <TopNavBigScreen
        updateSearchQuery={props.updateSearchQuery}
        updateLanguage={props.updateLanguage}
        language={props.language}
        keywords={props.keywords}
      />
    );
  } else if (isDesktopOrTablet) {
    return (
      <TopNavDesktop
        updateSearchQuery={props.updateSearchQuery}
        updateLanguage={props.updateLanguage}
        language={props.language}
        keywords={props.keywords}
      />
    );
  } else {
    //Mobile
    return (
      <TopNavMobile
        updateSearchQuery={props.updateSearchQuery}
        updateLanguage={props.updateLanguage}
        language={props.language}
        keywords={props.keywords}
      />
    );
  }
};

export default TopNav;
