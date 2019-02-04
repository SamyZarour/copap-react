import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ACTIONS from '../../actions/auth';
import SignInForm from '../../forms/SignInForm';

class SignInPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        const { email, password } = values;
        this.props.login(email, password);
    }

    render() {
        return (
            <SignInForm onSubmit={this.handleSubmit} />
        );
    }
}
const mapDispatchToProps = dispatch => ({
    login: (email, password) => dispatch(ACTIONS.login({ email, password }))
});

SignInPage.propTypes = {
    login: PropTypes.func.isRequired
};

export default withRouter(connect(null, mapDispatchToProps)(SignInPage));
