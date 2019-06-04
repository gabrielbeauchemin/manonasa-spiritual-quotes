import React from 'react';
import logo from './logo.svg';
import menuIcon from './icons/hamburgerMenu.svg';
import aboutIcon from './icons/about.svg';
import contactIcon from './icons/contact.svg';
import downloadIcon from './icons/download.svg';
import searchIcon from './icons/search.svg';
import searchRandomIcon from './icons/searchRandom.svg';


class Layout extends React.Component {
    render() {
        return (
            <div className="layout">
                <div className="menu" onClick={this.handleClick}>
                    <img src={menuIcon} alt="" height= "100%" width= "100%"/>
                    <ul style={{ display: 'none' }}>
                        <li><a href="./"><img src={aboutIcon} alt="" className="menuIcon" />About</a></li>
                        <li><a href="./"><img src={contactIcon} alt="" className="menuIcon"/>Download all quotes</a></li>
                        <li><a href="./"><img src={downloadIcon} alt="" className="menuIcon"/>Contact me</a></li>
                    </ul>
                </div>
                <div className="logo" onClick={this.handleClick}>
                    <img src={logo} alt="" height= "100%" width= "100%"/>
                </div>
                <form className="searchBox" action="./">
                    <input type="text" alt="" placeholder="Search Spiritual Quotes" name="search" />
                    <input className="searchIcon" title="search" alt="search" type="image" src={searchIcon} />
                    <input className="searchIcon" title="search randomly" alt="search randomly" type="image" src={searchRandomIcon} />
                </form>
            </div>
                
            );
        }

    handleClick() {
        let menu = document.querySelectorAll('.menu ul')[0];
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
}
        
export default Layout;