import React from "react";
import ContentMobile from "./ContentMobile";
import ContentDesktop from "./ContentDesktop";
import MediaQuery from "react-responsive";

class QuotesContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      quotesPerFetch: 15,
      quotesFetched: 0,
      allQuotesFetched: false,
      authorFilters: [],
      authorFiltersSelected: null,
      sourceFilters: [],
      sourceFiltersSelected: null,
    };
  }

  render() {
    return (
      <div>
        <MediaQuery minDeviceWidth={601}>
          <ContentDesktop
            quotes={this.state.quotes}
            isRandomSearch={this.props.isRandomSearch}
            language={this.props.language}
            authorFilters={this.state.authorFilters}
            sourceFilters={this.state.sourceFilters}
            allQuotesFetched={this.state.allQuotesFetched}
            updateAuthorFilters={(authorFilters) =>
              this.updateAuthorFilters(authorFilters)
            }
            updateSourceFilters={(sourceFilters) =>
              this.updateSourceFilters(sourceFilters)
            }
            showMoreQuotes={() => this.showMoreQuotes()}
          />
        </MediaQuery>
        <MediaQuery maxDeviceWidth={600}>
          <ContentMobile
            quotes={this.state.quotes}
            isRandomSearch={this.props.isRandomSearch}
            language={this.props.language}
            authorFilters={this.state.authorFilters}
            sourceFilters={this.state.sourceFilters}
            allQuotesFetched={this.state.allQuotesFetched}
            updateAuthorFilters={(authorFilters) =>
              this.updateAuthorFilters(authorFilters)
            }
            updateSourceFilters={(sourceFilters) =>
              this.updateSourceFilters(sourceFilters)
            }
            showMoreQuotes={() => this.showMoreQuotes()}
          />
        </MediaQuery>
      </div>
    );
  }

  componentDidMount() {
    this.actualiseQuotes(SearchQuotesMode.initialize);
  }

  componentDidUpdate(pastProps, pastState) {
    if (this.props.language !== pastProps.language) {
      this.actualiseQuotes(SearchQuotesMode.languageChanged);
    } else if (
      pastProps.searchId !== this.props.searchId &&
      this.state.isRandomSearch
    ) {
      this.actualiseQuotes(SearchQuotesMode.random);
    } else if (
      pastProps.searchId !== this.props.searchId &&
      !this.state.isRandomSearch
    ) {
      this.actualiseQuotes(SearchQuotesMode.search);
    }
  }

  actualiseQuotes(mode) {
    this.fetchFilterValues(mode, () => this.fetchQuotes());
  }

  fetchFilterValues(mode, callback) {
    const fetchAuthorFilters = fetch(
      `/authors?q=${this.props.searchQuery}&lang=${this.props.language}`
    )
      .then((res) => res.json())
      .then((res) => {
        let authors = [];
        res.forEach((x) => authors.push(x.author));
        this.setState({ authorFilters: authors });
      });
    const fetchSourceFilters = fetch(
      `/sources?q=${this.props.searchQuery}&lang=${this.props.language}`
    )
      .then((res) => res.json())
      .then((res) => {
        let sources = [];
        res.forEach((x) => sources.push(x.source));
        this.setState({ sourceFilters: sources });
      });
      
    Promise.all([fetchAuthorFilters, fetchSourceFilters]).then(() => {
      this.setState(
        {
          quotesFetched: 0,
          allQuotesFetched: false,
          authorFiltersSelected:
            mode === SearchQuotesMode.languageChanged
              ? null
              : this.state.authorFiltersSelected,
          sourceFiltersSelected:
            mode === SearchQuotesMode.languageChanged
              ? null
              : this.state.sourceFiltersSelected,
        },
        callback
      );
    });
  }

  fetchQuotes(accumulateQuotes = false) {
    let authorFilter =
      this.state.authorFiltersSelected == null
        ? ""
        : `authors=${this.state.authorFiltersSelected}&`;
    let sourceFilter =
      this.state.sourceFiltersSelected == null
        ? ""
        : `sources=${this.state.sourceFiltersSelected}&`;
    fetch(
      `/quotes?q=${this.props.searchQuery}&` +
        authorFilter +
        sourceFilter +
        `count=${this.state.quotesPerFetch}&` +
        `offset=${this.state.quotesFetched}&` +
        `random=${this.props.isRandomSearch}&` +
        `lang=${this.props.language}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (accumulateQuotes) {
          this.setState({
            quotes: this.state.quotes.concat(res),
            quotesReady: true,
            allQuotesFetched: res.length < this.state.quotesPerFetch,
          });
        } else {
          this.setState({
            quotes: res,
            quotesReady: true,
            allQuotesFetched: res.length < this.state.quotesPerFetch,
          });
        }
      });
  }

  showMoreQuotes() {
    this.setState(
      { quotesFetched: this.state.quotesFetched + this.state.quotesPerFetch },
      () => this.fetchQuotes(true)
    );
  }

  updateAuthorFilters(authorFilters) {
    this.setState(
      {
        authorFiltersSelected: authorFilters,
        quotesFetched: 0,
      },
      this.fetchQuotes
    );
  }

  updateSourceFilters(sourceFilters) {
    this.setState(
      {
        sourceFiltersSelected: sourceFilters,
        quotesFetched: 0,
      },
      this.fetchQuotes
    );
  }
}

const SearchQuotesMode = Object.freeze({
  initialize: 0,
  search: 1,
  random: 2,
  languageChanged: 3,
});

export default QuotesContent;
