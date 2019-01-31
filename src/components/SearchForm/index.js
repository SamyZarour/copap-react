import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';

const validate = values => {
    const errors = {};

    if (!values.query) {
        errors.query = 'Field is required';
    } else if (!values.query.match(/^[0-9]*$/i)) {
        errors.query = 'Invalid format';
    }

    return errors;
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

const SearchForm = props => {
    const {
        handleSubmit,
        invalid,
        submitting,
        pristine
    } = props;

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="fields">
                <Field name="query" type="text" label="Query" component={renderField} autocomplete="query" />
            </div>
            <button className="successButton" type="submit" disabled={pristine || invalid || submitting}>Submit { submitting && <Spinner />}</button>
        </form>
    );
};

SearchForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired
};

export default reduxForm({ form: 'SearchForm', validate })(SearchForm);
