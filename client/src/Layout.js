import React from 'react';
import logo from './logo.svg';
import menuIcon from './icons/hamburgerMenu.svg';
import aboutIcon from './icons/about.svg';
import contactIcon from './icons/contact.svg';
import downloadIcon from './icons/download.svg';
import searchIcon from './icons/search.svg';
import searchRandomIcon from './icons/searchRandom.svg';
import Select from 'react-select';

class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
            isRandomSearch: false,
            languages: [
                { value: 'en', label: 'En' },
                { value: 'fr', label: 'Fr' }],
            selectedLanguage: { value: 'en', label: 'En' }
        };
    }

    render() {
        return (
            <div className="layout">
                <div className="menuAndLogo">
                    <div className="menu" onClick={this.menuClick}>
                        <img src={menuIcon} alt="" width="100%" height="100%" />
                        <ul style={{ display: 'none' }}>
                            <li><a href="./"><img src={aboutIcon} alt="" className="menuIcon" />About</a></li>
                            <li><a href="./"><img src={contactIcon} alt="" className="menuIcon" />Download all quotes</a></li>
                            <li><a href="./"><img src={downloadIcon} alt="" className="menuIcon" />Contact</a></li>
                        </ul>
                    </div>
                    <div className="logo" onClick={this.handleClick}>
                        <img src={logo} alt="" width="100%" height="100%" />
                    </div>
                </div>
                <form className="searchBox" onSubmit={(e) => { this.props.updateSearchQuery(this.state.searchQuery, this.state.isRandomSearch); e.preventDefault(); }}>
                    <input autoFocus type="text" alt="" placeholder="Search Spiritual Quotes" name="search" style={{ paddingLeft: "8px" }} value={this.state.searchQuery} onChange={(e) => this.setState({ searchQuery: e.target.value })} />
                    <input className="searchIcon" title="search" alt="search" type="image" src={searchIcon} width="100%" height="100%" onClick={() => this.setState({ isRandomSearch: false })} />
                    <input className="searchIcon" title="search randomly" alt="search randomly" type="image" width="100%" height="100%" src={searchRandomIcon} onClick={() => this.setState({ isRandomSearch: true })} />
                </form>
                <Select
                    options={this.state.languages}
                    value={[this.state.selectedLanguage]}
                    onChange= {(newValue, actionMeta) => this.setState({ selectedLanguage: newValue })}
                    theme={theme => ({
                        ...theme,
                        borderRadius: 2,
                        colors: {
                            ...theme.colors,
                            primary25: '#EAEAEA',
                            primary: 'lightgray',
                        },
                    })}
                />
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
}

export default Layout;