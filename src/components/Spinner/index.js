import React, { Component } from 'react';
import './Spinner.scss';

class Spinner extends Component {
    constructor(props) {
        super(props);
        this.state = { displaySpinner: false };
        this.timer = setTimeout(() => this._ismounted && this.setState({ displaySpinner: true }), 250);
    }

    componentDidMount() {
        this._ismounted = true;
    }

    componentWillUnmount() {
        this._ismounted = false;
    }

    render() {
        return this.state.displaySpinner ? <div className="spinner" /> : null;
    }
}

export default Spinner;
