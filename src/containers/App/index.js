import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar';
import Main from '../../components/Main';
import Spinner from '../../components/Spinner';
import { getToken } from '../../utils';
import * as ACTIONS from '../../actions/auth';
import { authSelector } from '../../selectors/auth';
import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);
        if (getToken()) this.props.fetchCurrentUser();
    }

    render() {
        return (
            <div className="App">
                <Navbar username={this.props.auth && this.props.auth.user && this.props.auth.user.username} />
                {getToken() && !this.props.auth.isFetched ? <Spinner /> : <Main />}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: authSelector(state)
});

const mapDispatchToProps = dispatch => ({
    fetchCurrentUser: () => dispatch(ACTIONS.fetchCurrentUser())
});

App.propTypes = {
    auth: PropTypes.object,
    fetchCurrentUser: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
