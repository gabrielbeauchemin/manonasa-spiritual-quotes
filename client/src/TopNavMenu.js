import React from 'react'
import { useMediaQuery } from 'react-responsive'
import menuIcon from './icons/hamburgerMenu.svg';
import aboutIcon from './icons/about.svg';
import contactIcon from './icons/contact.svg';
import downloadIcon from './icons/download.svg';

const TopNavMenu = (props) => {
    const isMobile = useMediaQuery({
        query: '(max-device-width: 600px)'
    })
    if (isMobile) {
        return (
            <div className="menuMobile" onClick={() => menuClick(true)} tabIndex="1" onBlur={ () => menuBlur(true)} >
                <img src={menuIcon} alt="" width="100%" height="100%" />
                <ul style={{ display: 'none' }} >
                    <li><a href="./about"><div style={{ display: "flex" }}><img src={aboutIcon} alt="" className="menuIcon" />About</div></a></li>
                    <li><a href="./download"><div style={{ display: "flex" }}><img src={contactIcon} alt="" className="menuIcon" />Download all quotes</div></a></li>
                    <li><a href="./contact"><div style={{ display: "flex" }}><img src={downloadIcon} alt="" className="menuIcon" />Contact</div></a></li>
                </ul>
            </div >);
    }
    else {
        return (
            <div className="menu" onClick={() => menuClick(false)} tabIndex="1" onBlur={() => menuBlur(false)} >
                <img src={menuIcon} alt="" width="100%" height="100%" />
                <ul style={{ display: 'none' }} >
                    <li><a href="./about"><div style={{ display: "flex" }}><img src={aboutIcon} alt="" className="menuIcon" />About</div></a></li>
                    <li><a href="./download"><div style={{ display: "flex" }}><img src={contactIcon} alt="" className="menuIcon" />Download all quotes</div></a></li>
                    <li><a href="./contact"><div style={{ display: "flex" }}><img src={downloadIcon} alt="" className="menuIcon" />Contact</div></a></li>
                </ul>
            </div >);
    }
}

function menuClick(isMobile) {
    let menuClass = isMobile ? '.menuMobile ul' : '.menu ul'; 
    let menu = document.querySelectorAll(menuClass)[0];
    //toggle menu apparence
    if (menu.style.display === "none") {
        menu.style.display = "block";
        //begin animation
        menu.style.marginTop = "0.5em";
    }
    else {
        menu.style.display = "none";
        menu.style.marginTop = "0em";
    }
}

function menuBlur(isMobile) {
    let menuClass = isMobile ? '.menuMobile ul' : '.menu ul'; 
    let menu = document.querySelectorAll(menuClass)[0];
    menu.style.display = "none";
    menu.style.marginTop = "0em";
    document.activeElement.blur();

}

export default TopNavMenu;