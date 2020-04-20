import React from 'react';

class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filters: this.initializeFilters(this.props.values), //filterName => isChecked
        };
    }

    render() {
        if (this.props.values.length === 0) {
            return "";
        }
        return (
            <ul className="filter">
                <div className="filterCategory">
                    {this.props.display} <br />
                </div>
                <div className="filterValues" >
                    {Object.keys(this.state.filters).map((filterName, i) =>
                        <div className="filterValue" key={i}>
                            <input type="checkbox" name={filterName} checked={this.state.filters[filterName]} onChange={(e) => this.onCheckboxChange(e)} />
                            <div style={{ all: "unset" }} title={filterName}> {filterName}  </div>
                        </div>
                    )}
                </div>
            </ul>
        );
    }

    componentDidUpdate(pastProps, pastState) {
        //the values changed, so we need to reset the checked filtrer to all values
        if (!this.arraysEqual(pastProps.values, this.props.values)) {
            this.setState({
                filters: this.initializeFilters(this.props.values),
            });
        }
    }

    initializeFilters(filters) {
        let filtersDict = {};
        filters.forEach(element => {
            filtersDict[element] = true; //by default, all filters are checked
        });
        return filtersDict;
    }

    onCheckboxChange(e) {
        const filterName = e.target.name;
        const isChecked = e.target.checked;
        let newFilters = JSON.parse(JSON.stringify(this.state.filters));
        newFilters[filterName] = isChecked;
        this.setState({ filters: newFilters });
        this.props.onFilterChange(this.getCheckedFiltersName(newFilters));
    }

    getCheckedFiltersName(filters) {
        var checkedFilters = Object.keys(filters).reduce((p, c) => {
            if (filters[c]) p[c] = filters[c];
            return p;
        }, {});
        return Object.getOwnPropertyNames(checkedFilters);
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