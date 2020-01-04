import React from 'react';
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
            allQuotesFetched : false
        };
    }

    render() {
        return (
            <div className="content">
                <div className="filters">
                    <ul className="filter">
                        <div className="filterCategory">
                            Autor <br />
                        </div>

                        <div className="filterValues">
                            <input type="checkbox" name="autor" value="Ramana" /> Ramana <br />
                            <input type="checkbox" name="autor" value="Michael Langford" /> Michael Langford<br />
                            <input type="checkbox" name="autor" value="Robert Adams" /> Robert Adams<br />
                        </div>
                    </ul>
                    <ul className="filter">
                        <div className="filterCategory">
                            Livre <br />
                        </div>

                        <div className="filterValues">
                            <input type="checkbox" name="livre" value="livre1" /> Livre1 <br />
                            <input type="checkbox" name="livre" value="livre2" /> Livre2<br />
                            <input type="checkbox" name="livre" value="livre3" /> Livre3<br />
                        </div>
                    </ul>

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

    actualiseQuotes()
    {
        if(this.state.quotesReady){
            this.setState({ quotesReady: false });
        }
        else{
            this.setState({quotesFetched : 0}, 
            () => this.setState({allQuotesFetched : false}, 
            () => { fetch(`/quotes?q=${this.props.searchQuery.replace(" ", "+")}&count=${this.state.quotesPerFetch}&offset=${this.state.quotesFetched}`)
                    .then(res => res.json() )
                    .then(res => this.setState({ quotes: res }))
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
}

export default Content;