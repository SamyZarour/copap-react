import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { renderField } from '../utils';
import Spinner from '../../components/Spinner/index';

const validate = values => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Field is required';
    } else if (!values.username.match(/^[a-zA-Z0-9-]+$/)) {
        errors.username = 'Invalid format';
    }

    if (!values.password) {
        errors.password = 'Field is required';
    }

    return errors;
};

const SignInForm = props => {
    const {
        handleSubmit,
        invalid,
        submitting,
        pristine
    } = props;

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="fields">
                <Field name="username" type="username" label="Username" component={renderField} autocomplete="username" />
                <Field name="password" type="password" label="Password" component={renderField} />
            </div>
            <button className="successButton" type="submit" disabled={pristine || invalid || submitting}>Login { submitting && <Spinner />}</button>
        </form>
    );
};

SignInForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired
};

export default reduxForm({ form: 'SignInForm', validate })(SignInForm);
