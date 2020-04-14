import React from 'react';
import Filter from "./Filter"
import Quote from './Quote';
import MediaQuery from 'react-responsive'
import backIcon from './icons/back.svg';
import plusIcon from './icons/plus.svg';

class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quotes: [],
            lastSearchId: "",
            quotesPerFetch: 15,
            quotesFetched: 0,
            allQuotesFetched: false,
            authorFilters: [],
            authorFiltersSelected: null,
            sourceFilters: [],
            sourceFiltersSelected: null,
            contentMobileActivated: false
        };
    }

    render() {
        return (
            <div>
                <MediaQuery minDeviceWidth={601}>
                    <div className="content">
                        <div className="filters">
                            <Filter display="Author" values={this.state.authorFilters} onFilterChange={(authorFilters) => this.updateAuthorFilters(authorFilters)} />
                            <Filter display="Book" values={this.state.sourceFilters} onFilterChange={(sourceFilters) => this.updateSourceFilters(sourceFilters)} />
                        </div>
                        <div className="quotes">
                            {this.state.quotes.map((quote, index) =>
                                <Quote quote={quote.quote} author={quote.author} source={quote.source} language={quote.language} chapter={quote.chapter} number={quote.number} key={index} />
                            )}
                            {this.state.quotes.length > 0 && !this.props.isRandomSearch &&
                                <button type="button" className="moreQuoteButton" onClick={() => this.showMoreQuotes()} disabled={this.state.allQuotesFetched}>Show more</button>
                            }
                        </div>
                    </div>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={600}>
                    {!this.state.contentMobileActivated &&
                        <div className="filtersLabelMobile">
                            <b>Filters</b>
                            <img className="toggleFiltersMobile" title="search" alt="search" type="image" src={plusIcon} width="100%" height="100%" onClick={() => this.setState({ contentMobileActivated: !this.state.contentMobileActivated })} />
                        </div>
                    }
                    <div className="contentMobile">
                        <div className="filtersMobile">
                            {this.state.contentMobileActivated &&
                                <input className="desactivateFiltersMobile" title="search" alt="search" type="image" src={backIcon} width="100%" height="100%" onClick={() => this.setState({ contentMobileActivated: !this.state.contentMobileActivated })} />
                            }
                            {this.state.contentMobileActivated &&
                                <>
                                    <Filter display="Author" values={this.state.authorFilters} onFilterChange={(authorFilters) => this.updateAuthorFilters(authorFilters)} />
                                    <Filter display="Book" values={this.state.sourceFilters} onFilterChange={(sourceFilters) => this.updateSourceFilters(sourceFilters)} />
                                </>
                            }
                        </div>
                        <div className="quotes">
                            {this.state.quotes.map((quote, index) =>
                                <Quote quote={quote.quote} author={quote.author} source={quote.source} language={quote.language} chapter={quote.chapter} number={quote.number} key={index} />
                            )}
                            {this.state.quotes.length > 0 && !this.props.isRandomSearch &&
                                <button type="button" className="moreQuoteButton" onClick={() => this.showMoreQuotes()} disabled={this.state.allQuotesFetched}>Show more</button>
                            }
                        </div>
                    </div>
                </MediaQuery>
            </div>

        );
    }

    componentDidMount() {
        this.actualiseQuotes();
    }

    componentDidUpdate(pastProps, pastState) {
        if (pastProps.searchId !== this.props.searchId) {
            this.actualiseQuotes();
        }
    }

    actualiseQuotes() {
        this.setState({
            quotesFetched: 0,
            lastSearchId: this.props.searchId,
            allQuotesFetched: false,
            authorFiltersSelected: this.props.isRandomSearch ? this.state.authorFiltersSelected : null,
            sourceFiltersSelected: this.props.isRandomSearch ? this.state.sourceFiltersSelected : null
        },
            () => {
                this.fetchFilterValues();
                this.fetchQuotes();
            });
    }

    fetchFilterValues() {
        fetch(`/authors?q=${this.props.searchQuery}`)
            .then(res => res.json())
            .then(res => {
                let authors = [];
                res.forEach(x => authors.push(x.author));
                this.setState({ authorFilters: authors });
            });
        fetch(`/sources?q=${this.props.searchQuery}`)
            .then(res => res.json())
            .then(res => {
                let sources = [];
                res.forEach(x => sources.push(x.source));
                this.setState({ sourceFilters: sources });
            });
    }

    fetchQuotes(accumulateQuotes = false) {
        let authorFilter = this.state.authorFiltersSelected == null ? '' : `authors=${this.state.authorFiltersSelected}&`;
        let sourceFilter = this.state.sourceFiltersSelected == null ? '' : `sources=${this.state.sourceFiltersSelected}&`;
        fetch(`/quotes?q=${this.props.searchQuery}&` +
            authorFilter +
            sourceFilter +
            `count=${this.state.quotesPerFetch}&` +
            `offset=${this.state.quotesFetched}&` +
            `random=${this.props.isRandomSearch}`)
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