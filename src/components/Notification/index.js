import React from 'react';
import PropTypes from 'prop-types';
import './Notification.scss';

const Notification = props => (
    <div className="notification" style={props.style}>
        <span>{props.message}</span>
    </div>
);

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    style: PropTypes.object
};

Notification.defaultProps = {
    style: {}
};

export default Notification;
