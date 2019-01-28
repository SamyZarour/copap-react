import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Search.scss';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        };
    }

    render() {
        const { placeholder, handleChange } = this.props;
        return (
            <div className="search">
                <div className="searchBar">
                    <li className="fa fa-search" />
                    <input
                        className="searchInput"
                        type="text"
                        value={this.state.searchText}
                        onChange={e => {
                            this.setState({ searchText: e.target.value });
                            handleChange(e.target.value);
                        }}
                        placeholder={placeholder}
                    />
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    placeholder: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};


export default Search;
