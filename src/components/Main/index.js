import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userSelector } from '../../selectors/auth';
import HomePage from '../../containers/HomePage';
import SignInPage from '../../containers/SignInPage';
import SignUpPage from '../../containers/SignUpPage';
import Notifications from '../../containers/Notifications';
import LandingPage from '../../containers/LandingPage';
import NotFound from '../NotFound';

import './Main.scss';

const Main = props => (
    <div>
        <Notifications />
        <main className="Main">
            <Switch>
                <Route exact path="/" render={() => props.user ? <HomePage /> : <LandingPage />} />
                <Route exact path="/login" render={() => props.user ? <Redirect to="/" /> : <SignInPage />} />
                <Route exact path="/register" render={() => props.user ? <Redirect to="/" /> : <SignUpPage />} />
                <Route component={NotFound} />
            </Switch>
        </main>
    </div>
);

const mapStateToProps = state => ({
    user: userSelector(state)
});

Main.propTypes = {
    user: PropTypes.object
};

Main.defaultProps = {
    user: null
};

export default withRouter(connect(mapStateToProps, null)(Main));
