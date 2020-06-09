import React from "react";
import copyIcon from "./icons/copy.svg";
import showMoreIcon from "./icons/showMore.svg";
import Modal from "react-modal";
import Snackbar from "./Snackbar";

class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      modalStyle: {
        content: {
          top: "45%",
          left: "50%",
          right: "20%",
          bottom: "0%",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          fontSize: "1.5em"
        },
      },
    };

    this.snackbarRef = React.createRef();
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  render() {
    return (
      <div className="quote">
        {this.props.quote} <br />{" "}
        <span style={{ color: "gray" }}> -{this.props.author} </span>
        <br />
        <br />
        <div style={{ backgroundColor: "#f4f6f9" }}>
          <span>
            <button
              type="button"
              title={this.props.language === "fr" ? "Copier" : "Copy"}
              className="quoteButton"
              onClick={(e) =>
                this.copyQuote(this.props.quote + " -" + this.props.author)
              }
            >
              <img src={copyIcon} alt="" className="quoteIcon" />
            </button>
            <Snackbar ref={this.snackbarRef} />
            <button
              type="button"
              title={
                this.props.language === "fr"
                  ? "Plus d'information sur la citation"
                  : "See more information about the quote"
              }
              className="quoteButton"
              onMouseDown={this.openModal}
            >
              <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                style={this.state.modalStyle}
                closeTimeoutMS={250}
              >
                <div onClick={this.closeModal} className="close" /> <br />
                <h3 style={{ margin: "0 auto", width: "40%" }}>
                  {this.props.language === "fr"
                    ? "Toutes les informations par rapport à la citation"
                    : "Complete information about the quote"}
                </h3>{" "}
                <br />
                <div className="moreQuoteFields">
                  <div className="moreQuoteField">
                    <b>
                      {this.props.language === "fr" ? "Citation" : "Quote"}
                      :&nbsp;
                    </b>{" "}
                    <p>{this.props.quote}</p>
                  </div>
                  <div className="moreQuoteField">
                    <b>
                      {this.props.language === "fr" ? "Auteur" : "Author"}
                      :&nbsp;
                    </b>{" "}
                    <p>{this.props.author}</p>
                  </div>
                  <div className="moreQuoteField">
                    <b>Source:&nbsp;</b> <p>{this.props.source}</p>
                  </div>
                  <div className="moreQuoteField">
                    <b>
                      {this.props.language === "fr" ? "Langage" : "Language"}
                      :&nbsp;
                    </b>{" "}
                    <p>
                      {this.props.language === "en"
                        ? "English"
                        : this.props.language === "fr"
                        ? "Francais"
                        : "Unknown"}
                    </p>
                  </div>
                  {this.props.chapter && (
                    <div className="moreQuoteField">
                      <b>
                        {this.props.language === "fr" ? "Chapitre" : "Chapter"}
                        :&nbsp;
                      </b>{" "}
                      <p>{this.props.chapter}</p>
                    </div>
                  )}
                  {this.props.number && (
                    <div className="moreQuoteField">
                      <b>
                        {this.props.language === "fr" ? "Numéro" : "Number"}
                        :&nbsp;
                      </b>{" "}
                      <p>{this.props.number}</p>
                    </div>
                  )}
                </div>
              </Modal>
              <img src={showMoreIcon} alt="" className="quoteIcon" />
            </button>
          </span>
        </div>
      </div>
    );
  }

  //reference: https://techoverflow.net/2018/03/30/copying-strings-to-the-clipboard-using-pure-javascript/
  copyQuote(quote) {
    this.copyToClipBoard(quote);
    this.snackbarRef.current.openSnackBar(
      this.props.language === "fr" ? "Copié!" : "Copied!"
    );
  }

  copyToClipBoard(quote) {
    // Create new element
    var el = document.createElement("textarea");
    // Set value (string to be copied)
    el.value = quote;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute("readonly", "");
    el.style = { position: "absolute", left: "-9999px" };
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand("copy");
    // Remove temporary element
    document.body.removeChild(el);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
}

export default Quote;
