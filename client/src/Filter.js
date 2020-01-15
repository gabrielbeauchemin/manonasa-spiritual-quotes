import React from 'react';

class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lastValues : props.values,
            checkedFilters : []
        };
    }

    render() {
        if(this.props.values.length === 0) {
            return "";
        }
        return (
            <ul className="filter">
                <div className="filterCategory">
                    {this.props.display} <br />
                </div>
                <div className="filterValues" >
                    {this.props.values.map((value,i) =>
                        <div className="filterValue">
                        <input type="checkbox" name={value} onClick={(e) => this.onCheckboxChange(e)} defaultChecked={true}/> 
                        <div style={{all:"unset"}} title={value}> {value}  </div>
                        </div>
                    )}
                </div>
            </ul>
        );
    }

    componentDidUpdate() {
        //the values changed, so we need to reset the checked filtrer to all values
        if(!this.arraysEqual(this.state.lastValues,this.props.values)) {
            this.setState({lastValues: this.props.values, checkedFilters: this.props.values});
        }
    }

    onCheckboxChange(e) {
        const filter = e.target.name;
        const isChecked = e.target.checked;
        if (isChecked) { //add filter as checkFilters
            let newFilters = [...this.state.checkedFilters, filter];
            this.setState({ checkedFilters: newFilters});
            this.props.onFilterChange(newFilters);
        }
        else { //remove uncheck filter
            let newFilters = this.state.checkedFilters.filter(item => item !== filter);
            this.setState({ checkedFilters: newFilters});
            this.props.onFilterChange(newFilters);
        }
    }

    //https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
    arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
        for (var i = 0; i < a.length; ++i) {
          if (a[i] !== b[i]) return false;
        }
        return true;
      }
}

export default Filter;