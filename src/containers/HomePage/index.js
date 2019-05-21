import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { userSelector } from '../../selectors/auth';
import Card from '../../components/Card';
import './HomePage.scss';

const HomePage = ({ user }) => (
    <div className="HomePage">
        <div className="welcome">Welcome { user && user.username }!</div>
        <div className="Cards">
            <Card title="Supplier" link="/supplier" />
            <Card title="Customer" link="/customer" />
            <Card title="Report" link="/report" />
            <Card title="Sales" link="/sales" />
            <Card title="Contacts" link="/contacts" />
        </div>
    </div>
);

const mapStateToProps = state => ({
    user: userSelector(state)
});

HomePage.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        role: PropTypes.string
    }).isRequired
};

export default withRouter(connect(mapStateToProps, null)(HomePage));
