import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';


const validate = values => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Field is required';
    } else if (!values.username.match(/^[a-zA-Z0-9-]+$/)) {
        errors.username = 'Invalid format';
    }

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

const warn = values => {
    const warnings = {};
    if (values.password && values.password.length < 8) {
        warnings.password = 'Hmm, this is a bit short...';
    }
    return warnings;
};

const renderField = config => {
    const {
        input,
        label,
        type,
        meta: {
            touched,
            error,
            warning
        }
    } = config;

    return (
        <div className="field">
            <input {...input} placeholder={label} type={type} />
            {touched && ((error && <span className="error">{error}</span>) || (warning && <span className="warning">{warning}</span>))}
        </div>
    );
};

const SignUpForm = props => {
    const {
        handleSubmit,
        invalid,
        submitting,
        pristine
    } = props;

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="title">Create User</h2>
            <div className="fields">
                <Field name="username" type="text" label="Username" component={renderField} autocomplete="username" />
                <Field name="email" type="email" label="Email" component={renderField} autocomplete="email" />
                <Field name="password" type="password" label="Password" component={renderField} />
            </div>
            <button className="successButton" type="submit" disabled={pristine || invalid || submitting}>Register {submitting && <Spinner />}</button>
        </form>
    );
};

SignUpForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired
};

export default reduxForm({ form: 'SignUpForm', validate, warn })(SignUpForm);
