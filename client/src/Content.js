import React from 'react';
import Filter from "./Filter"
import Quote from './Quote';

class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quotes : [],
            lastSearchQuery : "",
            quotesReady : true,
            quotesPerFetch : 15,
            quotesFetched : 0,
            allQuotesFetched : false,
            authorFilters : [],
            authorFiltersSelected : [],
            sourceFilters : [],
            sourceFiltersSelected : []
        };
    }

    render() {
        return (
            <div className="content">
                <div className="filters">
                    <Filter display="Author" values={this.state.authorFilters} onFilterChange={(authorFilters) => this.updateAuthorFilters(authorFilters)}/>
                    <Filter display="Book" values={this.state.sourceFilters} onFilterChange={(sourceFilters) => this.updateSourceFilters(sourceFilters)}/>
                </div>
                <div className="quotes">
                    {this.state.quotes.map((quote, index) =>
                        <Quote quote={quote.quote} author={quote.author} source={quote.source} language={quote.source} chapter={quote.chapter} number={quote.number} />
                    )}
                    {this.state.quotes.length > 0 &&
                        <button type="button" className="moreQuoteButton" onClick={() => this.showMoreQuotes()} disabled={this.state.allQuotesFetched}>Show more</button>
                    }
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.actualiseQuotes();
    }

    componentDidUpdate() {
        debugger;
        this.actualiseQuotes();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.searchQuery !== this.props.searchQuery ||
               nextState.quotesReady;
    }

    actualiseQuotes()
    {
        debugger;
        if(this.state.quotesReady){
            this.setState({ quotesReady: false });
        }
        else{
            this.setState({quotesFetched : 0}, 
            () => this.setState({allQuotesFetched : false}, 
            () => { fetch(`/quotes?q=${this.props.searchQuery.replace(" ", "+")}&` +
                           `authors=${this.state.authorFiltersSelected}&` +
                           `sources=${this.state.sourceFiltersSelected}&` +
                           `count=${this.state.quotesPerFetch}&` +
                           `offset=${this.state.quotesFetched}`)
                    .then(res => res.json() )
                    .then(res => this.setState({ quotes: res }, () => {
                        this.setState({ authorFilters: this.getFilterValues("author"),
                                        sourceFilters: this.getFilterValues("source"),
                                        //to remove
                                        authorFiltersSelected: this.getFilterValues("author"),
                                        sourceFiltersSelected: this.getFilterValues("source")
                                    });
                    }))
                    .then(res => this.setState({ quotesReady: true })) })); 
        }
    }

    showMoreQuotes()
    {
        this.setState({quotesFetched : this.state.quotesFetched + this.state.quotesPerFetch});
        fetch(`/quotes?q=${this.props.searchQuery.replace(" ", "+")}&count=${this.state.quotesPerFetch}&offset=${this.state.quotesFetched}`)
            .then(res => res.json() )
            .then(res => {
                this.setState({ quotes: res.concat(this.state.quotes) });
                if(res.length < this.state.quotesPerFetch)
                {
                    this.setState({allQuotesFetched : true});
                } 
            })
            .then( () => this.setState({ quotesReady: true }));
    }

    getFilterValues(filterName) {
        let filterValues = [];
        this.state.quotes.map((value, index) => filterValues.push(value[filterName]));
        return [...new Set(filterValues)];
    }

    updateAuthorFilters(authorFilters)
    {
        debugger;
        this.setState({authorFiltersSelected : authorFilters}, 
            this.actualiseQuotes);
    }

    updateSourceFilters(sourceFilters)
    {
        this.setState({sourceFiltersSelected : sourceFilters}, 
            this.actualiseQuotes);
    }
}

export default Content;