import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { renderField } from '../utils';
import Spinner from '../../components/Spinner/index';

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Field is required';
    } else if (!values.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
        errors.email = 'Invalid format';
    }

    if (!values.password) {
        errors.password = 'Field is required';
    } else if (!values.password.match(/^[A-Za-z0-9!@#$%^&*\d]{8,32}$/)) {
        errors.password = 'Invalid format';
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
                <Field name="email" type="email" label="Email" component={renderField} autocomplete="email" />
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
