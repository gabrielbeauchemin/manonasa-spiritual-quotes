import React from 'react';
import copyIcon from './icons/copy.svg';
import showMoreIcon from './icons/showMore.svg';

class Quote extends React.Component {
    render() {
        return (
            <div className="quote">
                     {this.props.quote} <br/> <span style={{color: "gray"}}> -{this.props.author} </span>
                     <br/>
                     <br/>
                     <div style={{backgroundColor: "#f4f6f9"}}>
                        <span> 
                            <button type="button" title="Copy quote to clipboard" className="quoteButton" onClick={((e) => this.copy( this.props.quote + " -" + this.props.author ))} >
                            <img src={copyIcon} alt="" className="quoteIcon" />
                            </button>
                            <button type="button" title="See more information about the quote" className="quoteButton">
                            <img src={showMoreIcon} alt="" className="quoteIcon" />
                            </button> 
                        </span>
                     </div>
            </div>
        );
    }

    //reference: https://techoverflow.net/2018/03/30/copying-strings-to-the-clipboard-using-pure-javascript/
    copy(quote) {
        // Create new element
        var el = document.createElement('textarea');
        // Set value (string to be copied)
        el.value = quote;
        // Set non-editable to avoid focus and move outside of view
        el.setAttribute('readonly', '');
        el.style = {position: 'absolute', left: '-9999px'};
        document.body.appendChild(el);
        // Select text inside element
        el.select();
        // Copy text to clipboard
        document.execCommand('copy');
        // Remove temporary element
        document.body.removeChild(el);
    }
}
        
        
export default Quote;