import React from 'react';
import Filter from "./Filter"
import Quote from './Quote';

class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quotes: [],
            lastSearchQuery: "",
            quotesReady: true,
            quotesPerFetch: 15,
            quotesFetched: 0,
            allQuotesFetched: false,
            authorFilters: [],
            authorFiltersSelected: null,
            sourceFilters: [],
            sourceFiltersSelected: null
        };
    }

    render() {
        return (
            <div className="content">
                <div className="filters">
                    <Filter display="Author" values={this.state.authorFilters} onFilterChange={(authorFilters) => this.updateAuthorFilters(authorFilters)} />
                    <Filter display="Book" values={this.state.sourceFilters} onFilterChange={(sourceFilters) => this.updateSourceFilters(sourceFilters)} />
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
        this.actualiseQuotes();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.searchQuery !== this.props.searchQuery ||
            nextState.quotesReady;
    }

    actualiseQuotes() {
        if (this.state.quotesReady) {
            this.setState({ quotesReady: false });
        }
        else {
            this.setState({ quotesFetched: 0, allQuotesFetched: false },
                () => {
                    this.fetchFilterValues();
                    this.fetchQuotes();
                });
        }
    }

    fetchFilterValues() {
        fetch(`/authors?q=${this.props.searchQuery}`)
            .then(res => res.json())
            .then(res => {
                let authors = [];
                res.forEach(x => authors.push(x.author));
                this.setState({ authorFilters: authors })
            });
        fetch(`/sources?q=${this.props.searchQuery}`)
            .then(res => res.json())
            .then(res => {
                let sources = [];
                res.forEach(x => sources.push(x.source));
                this.setState({ sourceFilters: sources })
            });
    }

    fetchQuotes(accumulateQuotes = false) {
        let authorFilter = this.state.authorFiltersSelected == null ? '' : `authors=${this.state.authorFiltersSelected}&`;
        let sourceFilter = this.state.sourceFiltersSelected == null ? '' : `sources=${this.state.sourceFiltersSelected}&`;

        fetch(`/quotes?q=${this.props.searchQuery}&` +
            authorFilter +
            sourceFilter +
            `count=${this.state.quotesPerFetch}&` +
            `offset=${this.state.quotesFetched}`)
            .then(res => res.json())
            .then(res => {
                if (accumulateQuotes) {
                    this.setState({
                        quotes: res.concat(this.state.quotes),
                        quotesReady: true,
                        allQuotesFetched: res.length < this.state.quotesPerFetch
                    });
                }
                else {
                    this.setState({
                        quotes: res,
                        quotesReady: true,
                        allQuotesFetched: res.length < this.state.quotesPerFetch
                    });
                }
            });
    }

    showMoreQuotes() {
        this.setState({ quotesFetched: this.state.quotesFetched + this.state.quotesPerFetch },
            () => this.fetchQuotes(true));
    }

    updateAuthorFilters(authorFilters) {
        this.setState({
            authorFiltersSelected: authorFilters,
            quotesFetched: 0,
        },
            this.fetchQuotes);
    }

    updateSourceFilters(sourceFilters) {
        this.setState({
            sourceFiltersSelected: sourceFilters,
            quotesFetched: 0,
        },
            this.fetchQuotes);
    }
}

export default Content;