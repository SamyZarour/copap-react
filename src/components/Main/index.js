import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userSelector } from '../../selectors/auth';
import HomePage from '../../containers/HomePage';
import SignUpPage from '../../containers/SignUpPage';
import Notifications from '../../containers/Notifications';
import LandingPage from '../../containers/LandingPage';
import BrandSearchPage from '../../containers/BrandSearchPage';
import CustomerSearchPage from '../../containers/CustomerSearchPage';
import ReportPage from '../../containers/ReportPage';
import SalesPage from '../../containers/SalesPage';
import ContactsPage from '../../containers/ContactsPage';
import NotFound from '../NotFound';

import './Main.scss';

const Main = props => (
    <div>
        <Notifications />
        <main className="Main">
            <Switch>
                <Route exact path="/" render={() => props.user ? <HomePage /> : <LandingPage />} />
                <Route exact path="/supplier" render={() => props.user ? <BrandSearchPage /> : <LandingPage />} />
                <Route exact path="/customer" render={() => props.user ? <CustomerSearchPage /> : <LandingPage />} />
                <Route exact path="/report" render={() => props.user ? <ReportPage /> : <LandingPage />} />
                <Route exact path="/sales" render={() => props.user ? <SalesPage /> : <LandingPage />} />
                <Route exact path="/contacts" render={() => props.user ? <ContactsPage /> : <LandingPage />} />
                <Route exact path="/admin" render={() => (props.user && props.user.role === 'admin') ? <SignUpPage /> : <Redirect to="/" />} />
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
