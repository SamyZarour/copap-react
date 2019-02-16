import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as ACTIONS from '../../actions/auth';
import SignInForm from '../../forms/SignInForm';
import './LandingPage.scss';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        const { username, password } = values;
        this.props.login(username, password);
    }

    render() {
        return (
            <div className="LandingPage">
                <img src="/icons/logo_copap.gif" alt="Copap Inc" />
                <SignInForm onSubmit={this.handleSubmit} />
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    login: (username, password) => dispatch(ACTIONS.login({ username, password }))
});

LandingPage.propTypes = {
    login: PropTypes.func.isRequired
};

export default withRouter(connect(null, mapDispatchToProps)(LandingPage));
