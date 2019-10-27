import React from 'react';
import Quote from './Quote';

class Content extends React.Component {
    render() {
        return (  
            <div className="content">
                <div className="filters">
                    <ul className="filter">
                        <div className="filterCategory"> 
                            Autor <br/>   
                        </div>  

                        <div className="filterValues"> 
                            <input type="checkbox" name="autor" value="Ramana" /> Ramana <br/>
                            <input type="checkbox" name="autor" value="Michael Langford" /> Michael Langford<br/>
                            <input type="checkbox" name="autor" value="Robert Adams" /> Robert Adams<br/>   
                        </div>               
                    </ul>
                    <ul className="filter">
                        <div className="filterCategory"> 
                            Livre <br/>   
                        </div>  

                        <div className="filterValues"> 
                            <input type="checkbox" name="livre" value="livre1" /> Livre1 <br/>
                            <input type="checkbox" name="livre" value="livre2" /> Livre2<br/>
                            <input type="checkbox" name="livre" value="livre3" /> Livre3<br/>   
                        </div>               
                    </ul>
                
                </div>
                <div className="quotes">
                    <Quote quote="Your own Self-Realization is the greatest service you can render the world." author="Ramana" />
                    <Quote quote="Wanting to reform the world without discovering one's true self is like trying to cover the world with leather to avoid the pain of walking on stones and thorns. It is much simpler to wear shoes." author="Ramana" />
                    <Quote quote="Happiness is your nature. It is not wrong to desire it. What is wrong is seeking it outside when it is inside." author="Ramana" />
                    <button type="button" className="moreQuoteButton">Show more</button>
                </div>
                 
            </div>
        );
    }
    
}
        
export default Content;