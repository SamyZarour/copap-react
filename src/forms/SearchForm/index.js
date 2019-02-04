import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { renderField } from '../utils';
import Spinner from '../../components/Spinner/index';

const validate = values => {
    const errors = {};

    if (!values.query) {
        errors.query = 'Field is required';
    } else if (!values.query.match(/^[0-9]*$/i)) {
        errors.query = 'Invalid format';
    }

    return errors;
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
