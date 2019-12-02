import React from 'react';
import Quote from './Quote';

class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quotes : []
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
                        <Quote quote={quote.quote} author={quote.author} />
                    )}
                    <button type="button" className="moreQuoteButton">Show more</button>
                </div>

            </div>
        );
    }

    componentDidMount() {
        fetch('/quotes')
            .then(res => res.json() )
            .then(res => this.setState({ quotes: res })) ;
    }

}

export default Content;