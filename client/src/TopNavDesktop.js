import React from 'react';
import logo from './logo.svg';
import searchIcon from './icons/search.svg';
import searchRandomIcon from './icons/searchRandom.svg';
import Select from 'react-select';
import TopNavMenu from './TopNavMenu';

class TopNavDesktop extends React.Component {

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
            <div className="topNavLaptop">
                <div className="menuAndLogo">
                    <TopNavMenu/>
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
                <div className="languagesSelector">
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
                    />
                </div>
            </div>
        );
    }
}

export default TopNavDesktop;