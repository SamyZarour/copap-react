import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { userSelector } from '../../selectors/auth';
import './HomePage.scss';

const HomePage = ({ user }) => (
    <div className="HomePage">
        Welcome { user && user.username }!
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
