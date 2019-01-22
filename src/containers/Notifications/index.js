import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Notification from '../../components/Notification';
import './Notifications.scss';
import { messagesSelector } from '../../selectors/modal';

const Notifications = props => {
    const notifications = props.notifications.map(notification => <Notification {...notification} />);

    return (
        <div className="notifications">
            <ReactCSSTransitionGroup
                transitionName="notification"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
            >
                {notifications}
            </ReactCSSTransitionGroup>
        </div>
    );
};


const mapStateToProps = state => ({
    notifications: messagesSelector(state)
});

Notifications.propTypes = {
    notifications: PropTypes.array.isRequired
};

export default connect(mapStateToProps, null)(Notifications);
