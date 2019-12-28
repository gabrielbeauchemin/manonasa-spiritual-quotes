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
                <div className="menu" onClick={this.menuClick}>
                    <img src={menuIcon} alt="" height= "100%" width= "100%"/>
                    <ul style={{ display: 'none' }}>
                        <li><a href="./"><img src={aboutIcon} alt="" className="menuIcon" />About</a></li>
                        <li><a href="./"><img src={contactIcon} alt="" className="menuIcon"/>Download all quotes</a></li>
                        <li><a href="./"><img src={downloadIcon} alt="" className="menuIcon"/>Contact</a></li>
                    </ul>
                </div>
                <div className="logo" onClick={this.handleClick}>
                    <img src={logo} alt="" height= "100%" width= "100%"/>
                </div>
                <form className="searchBox" onSubmit= {(e) => {e.preventDefault(); this.props.updateSearchQuery(e.target[0].value);}}>
                    <input type="text" alt="" placeholder="Search Spiritual Quotes" name="search" />
                    <input className="searchIcon" title="search" alt="search" type="image" src={searchIcon} />
                    <input className="searchIcon" title="search randomly" alt="search randomly" type="image" src={searchRandomIcon}/>
                </form>
                <div className="langageToggle">
                    <span className="langageLabel" style={{margin: '4px 2px 0px 0px', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer'}} onClick={this.langageToggle}> Fr </span >
                    <label className="switch" onClick={ () => {this.langageToggle()}}>
                        <input type="checkbox"/>
                        <span className="slider round"/>
                    </label>
                    <span className="langageLabel" style={{margin: '4px 0px 0px 2px', fontWeight: 'bold', cursor: 'pointer'}} onClick={this.langageToggle}> En </span >
                </div>
            </div>
                
            );
        }

    menuClick() {
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

    langageToggle(event) {
        if(event.currentTarget.localName === 'span') //event come from clicking the labels
        {
            //switch the langage toggle button
            let currState = document.querySelectorAll('.langageToggle .switch input')[0].checked;
            document.querySelectorAll('.langageToggle .switch input')[0].checked = !currState;
        }

        let fr = document.querySelectorAll('.langageToggle .langageLabel')[0];
        let en = document.querySelectorAll('.langageToggle .langageLabel')[1];
        let isEnlish = document.querySelectorAll('.langageToggle .switch input')[0].checked;

        if(isEnlish)
        {
            en.style.textDecoration = "underline";
            fr.style.textDecoration = "";
        }
        else 
        { 
            fr.style.textDecoration = "underline";
            en.style.textDecoration = "";
        }
    }
}
        
export default Layout;