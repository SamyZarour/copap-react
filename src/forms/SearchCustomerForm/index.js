import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { renderFieldSelect, renderFieldDatePicker } from '../utils';
import Spinner from '../../components/Spinner/index';
import './style.scss';

const validate = values => {
    const errors = {};

    if (values.dueDateFrom && values.dueDateTo && new Date(values.dueDateFrom) > new Date(values.dueDateTo)) {
        errors.dueDateFrom = 'From value must be smaller than To Value';
    }

    return errors;
};

const SearchCustomerForm = props => {
    const {
        handleSubmit,
        invalid,
        submitting,
        pristine,
        productTypes
    } = props;

    return (
        <div className="SearchCustomerForm">
            <form className="form" onSubmit={handleSubmit}>
                <div className="fields">
                    <Field name="productType" placeholder="Select..." type="text" label="Product Type" component={renderFieldSelect} options={productTypes} autocomplete="productType" />
                    <div className="category-columns">
                        <div className="category-column">
                            <Field name="orderDateFrom" type="date" label="Order Date" placeholder="From" component={renderFieldDatePicker} autocomplete="orderDateFrom" />
                        </div>
                        <div className="category-column">
                            <Field name="orderDateTo" type="date" placeholder="To" component={renderFieldDatePicker} autocomplete="orderDateTo" />
                        </div>
                    </div>
                </div>
                <button className="successButton" type="submit" disabled={pristine || invalid || submitting}>Refresh Invoices { submitting && <Spinner />}</button>
            </form>
        </div>
    );
};

SearchCustomerForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    productTypes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default reduxForm({ form: 'SearchCustomerForm', validate })(SearchCustomerForm);
