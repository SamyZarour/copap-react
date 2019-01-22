import React from 'react';
import './HomePage.scss';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userSelector } from '../../selectors/auth';


const HomePage = props => (
    <div className="HomePage">
        <h1>
            <span>{`Welcome ${props.user.username}!`}</span>
        </h1>
    </div>
);

const mapStateToProps = state => ({
    user: userSelector(state)
});

HomePage.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired
    }).isRequired
};

export default withRouter(connect(mapStateToProps, null)(HomePage));
