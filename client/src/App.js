import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import TopNav from './TopNav'
import Content from './Content'
import AboutPage from './AboutPage'
import DownloadPage from './DownloadPage'
import ContactPage from './ContactPage'

class Quote extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchId: this.uuidv4(),
            searchQuery: "",
            isRandomSearch: true,
        }

        this.updateSearchQuery = this.updateSearchQuery.bind(this)
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <>
                            <TopNav updateSearchQuery={this.updateSearchQuery} />
                            <Content searchId={this.state.searchId}
                                searchQuery={this.state.searchQuery}
                                isRandomSearch={this.state.isRandomSearch}
                            />
                        </>
                    </Route>
                    <Route exact path="/about">
                        <>
                            <TopNav updateSearchQuery={this.updateSearchQuery} />
                            <AboutPage/>
                        </>
                    </Route>
                    <Route exact path="/download">
                        <>
                            <TopNav updateSearchQuery={this.updateSearchQuery} />
                            <DownloadPage/>
                        </>
                    </Route>
                    <Route exact path="/contact">
                        <>
                            <TopNav updateSearchQuery={this.updateSearchQuery} />
                            <ContactPage/>
                        </>
                    </Route>

                </Switch>
            </Router>
        )
    }

    updateSearchQuery(searchQuery, isRandomSearch) {
        this.setState({
            searchId: this.uuidv4(),
            searchQuery: searchQuery,
            isRandomSearch: isRandomSearch,
        });
    }

    //https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // eslint-disable-next-line
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

export default Quote;