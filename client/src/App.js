import React from 'react';
import Layout from './Layout'
import Content from './Content'

class Quote extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          searchQuery: "",
        }

        this.updateSearchQuery = this.updateSearchQuery.bind(this)
    }

    render() {
        return (
                <div>
                   <Layout updateSearchQuery={this.updateSearchQuery}/> 
                   <Content searchQuery={this.state.searchQuery}/>
                </div>
        )
    }

    updateSearchQuery(searchQuery)
    {
        this.setState({ searchQuery: searchQuery });
    }
}

export default Quote;