import React from 'react';
import logo from './logo.svg';
import menuIcon from './icons/hamburgerMenu.svg';
import aboutIcon from './icons/about.svg';
import contactIcon from './icons/contact.svg';
import downloadIcon from './icons/download.svg';
import searchIcon from './icons/search.svg';
import searchRandomIcon from './icons/searchRandom.svg';
import Select from 'react-select';

class TopNavBigScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
            isRandomSearch: false,
            languages: [
                { value: 'en', label: 'English' },
                { value: 'fr', label: 'Français' }],
            selectedLanguage: { value: 'en', label: 'English' }
        };
    }

    render() {
        return (
            <div className="topNavBigScreen">
                <div className="menuAndLogo">
                    <div className="menu" onClick={this.menuClick} tabindex="1" onBlur={this.menuBlur}>
                        <img src={menuIcon} alt="" width="100%" height="100%" />
                        <ul style={{ display: 'none' }} >
                            <li><a href="./"><div style={{ display: "flex" }}><img src={aboutIcon} alt="" className="menuIcon" />About</div></a></li>
                            <li><a href="./"><div style={{ display: "flex" }}><img src={contactIcon} alt="" className="menuIcon" />Download all quotes</div></a></li>
                            <li><a href="./"><div style={{ display: "flex" }}><img src={downloadIcon} alt="" className="menuIcon" />Contact</div></a></li>
                        </ul>
                    </div>
                    <div className="logo">
                        <a href="/">
                            <img src={logo} alt="" width="100%" height="100%" />
                        </a>
                    </div>
                </div>
                <form className="searchBox" onSubmit={(e) => { this.props.updateSearchQuery(this.state.searchQuery, this.state.isRandomSearch); e.preventDefault(); }}>
                    <input autoFocus type="text" alt="" placeholder="Search Spiritual Quotes" name="search" style={{ paddingLeft: "8px" }} value={this.state.searchQuery} onChange={(e) => this.setState({ searchQuery: e.target.value })} />
                    <input className="searchIcon" title="search" alt="search" type="image" src={searchIcon} width="100%" height="100%" onClick={() => this.setState({ isRandomSearch: false })} />
                    <input className="searchIcon" title="search randomly" alt="search randomly" type="image" width="100%" height="100%" src={searchRandomIcon} onClick={() => this.setState({ isRandomSearch: true })} />
                </form>
                <div className="languagesSelectorBigScreen">
                    <Select
                        options={this.state.languages}
                        value={[this.state.selectedLanguage]}
                        onChange={(newValue, actionMeta) => this.setState({ selectedLanguage: newValue })}
                        theme={theme => ({
                            ...theme,
                            borderRadius: 2,
                            colors: {
                                ...theme.colors,
                                primary25: '#EAEAEA',
                                primary: 'lightgray',
                            },
                        })}
                        styles={{
                            control: base => ({
                                ...base,
                                height: 80,
                                minHeight: 80
                            })
                        }}
                    />
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

    menuBlur() {
        let menu = document.querySelectorAll('.menu ul')[0];
        menu.style.display = "none";
        menu.style.marginTop = "0em";
        document.activeElement.blur();

    }
}

export default TopNavBigScreen;