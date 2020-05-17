import React from "react";
import { useMediaQuery } from "react-responsive";
import menuIcon from "./icons/hamburgerMenu.svg";
import aboutIcon from "./icons/about.svg";
import contactIcon from "./icons/contact.svg";
import downloadIcon from "./icons/download.svg";
import searchIcon from "./icons/search.svg";
import sunIcon from "./icons/sun.svg";

const TopNavMenu = (props) => {
  const isMobile = useMediaQuery({
    query: "(max-device-width: 600px)",
  });
  return (
    <div className={isMobile ? "menuMobile" : "menu"}>
      <img
        src={menuIcon}
        tabIndex={0}
        onClick={() => menuClick(isMobile)}
        onBlur={(e) => menuBlur(isMobile)}
        alt=""
        width="100%"
        height="100%"
      />
      <ul style={{ display: "none" }}>
        <li>
          <a href={"./about?lang=" + props.language}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={aboutIcon} alt="" className="menuIcon" />
              <div>{props.language === "fr" ? "A propos" : "About"}</div>
            </div>
          </a>
        </li>
        <li>
          <a href={"./?lang=" + props.language}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={searchIcon} alt="" className="menuIcon" />
              <div>{props.language === "fr" ? "Chercher des citations" : "Search quotes"}</div>
            </div>
          </a>
        </li>
        <li>
          <a href={"./dailyQuote?lang=" + props.language}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={sunIcon} alt="" className="menuIcon" />
              <div>{props.language === "fr" ? "Citation de la journée" : "Daily quote"}</div>
            </div>
          </a>
        </li>
        <li>
          <a href={"./download?lang=" + props.language}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={downloadIcon} alt="" className="menuIcon" />
              <div>{props.language === "fr" ? "Télécharger les citations" : "Download all quotes"}</div>
            </div>
          </a>
        </li>
        <li>
          <a href={"./contact?lang=" + props.language}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={contactIcon} alt="" className="menuIcon" />
              <div>{props.language === "fr" ? "Nous joindre" : "Search"}</div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

function menuClick(isMobile) {
  try {
    let menuClass = isMobile ? ".menuMobile ul" : ".menu ul";
    let menu = document.querySelectorAll(menuClass)[0];
    //toggle menu apparence
    if (menu.style.display === "none") {
      menu.style.display = "block";
      menu.style.marginTop = "10px";
    } else {
      menu.style.display = "none";
      menu.style.marginTop = "0px";
    }
  } catch (e) {}
}

function menuBlur(isMobile) {
  //hack: the blur is anywhere except the menu button...that means that the open menu also fires blur
  //preventing the user to follow the hyperlink of a menu item
  //a simple workaround is to fire it after 200ms, so if the user has clicked on a menu item
  //he will be redirect to the requested page
  setTimeout(function () {
    try {
      let menuClass = isMobile ? ".menuMobile ul" : ".menu ul";
      let menu = document.querySelectorAll(menuClass)[0];
      menu.style.display = "none";
      menu.style.marginTop = "0em";
    } catch (e) {}
  }, 200);
}

export default TopNavMenu;
