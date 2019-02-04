import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { renderFieldSelect } from '../utils';
import Spinner from '../../components/Spinner/index';
import './style.scss';

const SelectBrandForm = props => {
    const {
        handleSubmit,
        invalid,
        submitting,
        pristine,
        brands
    } = props;

    return (
        <div className="IndexForm">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="title">Index</h2>
                <div className="fields">
                    <Field name="brand" placeholder="Select..." type="text" label="Brands" component={renderFieldSelect} options={brands} autocomplete="brand" />
                </div>
                <button className="successButton" type="submit" disabled={pristine || invalid || submitting}>Submit { submitting && <Spinner />}</button>
            </form>
        </div>
    );
};

SelectBrandForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    brands: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default reduxForm({ form: 'SelectBrandForm' })(SelectBrandForm);
