import React from 'react'
import { useMediaQuery } from 'react-responsive'
import menuIcon from './icons/hamburgerMenu.svg';
import aboutIcon from './icons/about.svg';
import contactIcon from './icons/contact.svg';
import downloadIcon from './icons/download.svg';

const TopNavMenu = (props) => {
    const isMobile = useMediaQuery({
        query: '(max-device-width: 600px)'
    });
    if (isMobile) {
        return (
            <div className="menuMobile">
                <img src={menuIcon} tabIndex={0} onClick={() => menuClick(true)} onBlur={(e) => menuBlur(e, true)} alt="" width="100%" height="100%" />
                <ul style={{ display: 'none' }}  >
                    <li><a href="./about"><div style={{ display: "flex" }}><img src={aboutIcon} alt="" className="menuIcon" />About</div></a></li>
                    <li><a href="./download"><div style={{ display: "flex" }}><img src={contactIcon} alt="" className="menuIcon" />Download all quotes</div></a></li>
                    <li><a href="./contact"><div style={{ display: "flex" }}><img src={downloadIcon} alt="" className="menuIcon" />Contact</div></a></li>
                </ul>
            </div >);
    }
    else {
        return (
            <div className="menu" >
                <img src={menuIcon} tabIndex={0} onClick={() => menuClick(false)} onBlur={(e) => menuBlur(e, false)} alt="" width="100%" height="100%" />
                <ul style={{ display: 'none' }}   >
                    <li><a href="./about"><div style={{ display: "flex" }}><img src={aboutIcon} alt="" className="menuIcon" />About</div></a></li>
                    <li><a href="./download"><div style={{ display: "flex" }}><img src={contactIcon} alt="" className="menuIcon" />Download all quotes</div></a></li>
                    <li><a href="./contact"><div style={{ display: "flex" }}><img src={downloadIcon} alt="" className="menuIcon" />Contact</div></a></li>
                </ul>
            </div >);
    }
}

function menuClick(isMobile) {
    try {
        let menuClass = isMobile ? '.menuMobile ul' : '.menu ul';
        let menu = document.querySelectorAll(menuClass)[0];
        //toggle menu apparence
        if (menu.style.display === "none") {
            menu.style.display = "block";
            menu.style.marginTop = "10px";
        }
        else {
            menu.style.display = "none";
            menu.style.marginTop = "0px";
        }
    }
    catch (e) { }

}

function menuBlur(isMobile) {
    //hack: the blur is anywhere except the menu button...that means that the open menu also fires blur
    //preventing the user to follow the hyperlink of a menu item
    //a simple workaround is to fire it after 200ms, so if the user has clicked on a menu item
    //he will be redirect to the requested page
    setTimeout(function () {
        try {
            let menuClass = isMobile ? '.menuMobile ul' : '.menu ul';
            let menu = document.querySelectorAll(menuClass)[0];
            menu.style.display = "none";
            menu.style.marginTop = "0em";
        }
        catch (e) { }

    }, 200);
}

export default TopNavMenu;