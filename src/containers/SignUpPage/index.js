import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ACTIONS from '../../actions/auth';
import SignUpForm from '../../components/SignUpForm';

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = values => {
        const { username, email, password } = values;
        this.props.register(username, email, password);
    };

    render() {
        return (
            <SignUpForm onSubmit={this.handleSubmit} />
        );
    }
}

const mapDispatchToProps = dispatch => ({
    register: (username, email, password) => dispatch(ACTIONS.register({ username, email, password }))
});

SignUpPage.propTypes = {
    register: PropTypes.func.isRequired
};

export default withRouter(connect(null, mapDispatchToProps)(SignUpPage));
