import React from 'react';
import logo from './logo.svg';
import menuIcon from './icons/hamburgerMenu.svg';
import aboutIcon from './icons/about.svg';
import contactIcon from './icons/contact.svg';
import downloadIcon from './icons/download.svg';
import searchIcon from './icons/search.svg';
import searchRandomIcon from './icons/searchRandom.svg';

class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
            isRandomSearch: false
        };
    }

    render() {
        return (
            <div className="layout">
                <div className="menuAndLogo">
                    <div className="menu" onClick={this.menuClick}>
                        <img src={menuIcon} alt="" width="100%" height="100%"/>
                        <ul style={{ display: 'none' }}>
                            <li><a href="./"><img src={aboutIcon} alt="" className="menuIcon" />About</a></li>
                            <li><a href="./"><img src={contactIcon} alt="" className="menuIcon" />Download all quotes</a></li>
                            <li><a href="./"><img src={downloadIcon} alt="" className="menuIcon" />Contact</a></li>
                        </ul>
                    </div>
                    <div className="logo" onClick={this.handleClick}>
                        <img src={logo} alt="" width="100%" height="100%"/>
                    </div>
                </div>
                <form className="searchBox" onSubmit={(e) => { this.props.updateSearchQuery(this.state.searchQuery, this.state.isRandomSearch); e.preventDefault(); }}>
                    <input autoFocus type="text" alt="" placeholder="Search Spiritual Quotes" name="search" style={{ paddingLeft: "8px" }} value={this.state.searchQuery} onChange={(e) => this.setState({ searchQuery: e.target.value })} />
                    <input className="searchIcon" title="search" alt="search" type="image" src={searchIcon} width="100%" height="100%" onClick={() => this.setState({ isRandomSearch: false })} />
                    <input className="searchIcon" title="search randomly" alt="search randomly" type="image" width="100%" height="100%" src={searchRandomIcon} onClick={() => this.setState({ isRandomSearch: true })} />
                </form>
                <div className="langageToggle">
                    <span className="langageLabel" style={{ margin: '4px 2px 0px 0px', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }} onClick={this.langageToggle}> En </span >
                    <label className="switch" onClick={(e) => { this.langageToggle(e) }}>
                        <input type="checkbox" />
                        <span className="slider round" />
                    </label>
                    <span className="langageLabel" style={{ margin: '4px 0px 0px 2px', fontWeight: 'bold', cursor: 'pointer' }} onClick={this.langageToggle}> Fr </span >
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
        if (event.currentTarget.localName === 'span') //event come from clicking the labels
        {
            //switch the langage toggle button
            let currState = document.querySelectorAll('.langageToggle .switch input')[0].checked;
            document.querySelectorAll('.langageToggle .switch input')[0].checked = !currState;
        }

        let en = document.querySelectorAll('.langageToggle .langageLabel')[0];
        let fr = document.querySelectorAll('.langageToggle .langageLabel')[1];
        let isFrench = document.querySelectorAll('.langageToggle .switch input')[0].checked;

        if (isFrench) {
            fr.style.textDecoration = "underline";
            en.style.textDecoration = "";
        }
        else {
            en.style.textDecoration = "underline";
            fr.style.textDecoration = "";
        }
    }
}

export default Layout;