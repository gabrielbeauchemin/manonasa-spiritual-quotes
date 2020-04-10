import React from 'react';
import TopNav from './TopNav'
import Content from './Content'

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
            <div>
                <TopNav updateSearchQuery={this.updateSearchQuery} />
                <Content searchId={this.state.searchId}
                    searchQuery={this.state.searchQuery}
                    isRandomSearch={this.state.isRandomSearch}
                />
            </div>
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