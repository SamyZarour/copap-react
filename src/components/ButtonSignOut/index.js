import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Clickable from '../Clickable';
import * as ACTIONS from '../../actions/auth';

const ButtonSignOut = props => (
    <Clickable onClick={props.logout}>
        Log Out
    </Clickable>
);

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(ACTIONS.logout())
});

ButtonSignOut.propTypes = {
    logout: PropTypes.func.isRequired
};

export default withRouter(connect(null, mapDispatchToProps)(ButtonSignOut));
