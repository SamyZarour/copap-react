import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { renderField, renderFieldSelect, renderFieldDatePicker } from '../utils';
import Spinner from '../../components/Spinner/index';
import './style.scss';

const validate = values => {
    const errors = {};

    if (values.quantityLow && values.quantityHigh && values.quantityLow > values.quantityHigh) {
        errors.quantityLow = 'From value must be smaller than To Value';
    }

    if (values.dueDateFrom && values.dueDateTo && new Date(values.dueDateFrom) > new Date(values.dueDateTo)) {
        errors.dueDateFrom = 'From value must be smaller than To Value';
    }

    if (values.orderDateFrom && values.orderDateTo && new Date(values.orderDateFrom) > new Date(values.orderDateTo)) {
        errors.orderDateFrom = 'From value must be smaller than To Value';
    }

    return errors;
};

const SearchIndexForm = props => {
    const {
        handleSubmit,
        invalid,
        submitting,
        pristine,
        brands,
        customers,
        destinationCountries,
        productTypes
    } = props;

    return (
        <div className="IndexForm">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="title">Index</h2>
                <div className="fields">
                    <Field name="brand" placeholder="Select..." type="text" label="Suppliers" component={renderFieldSelect} options={brands} autocomplete="brand" />
                    <div className="category-columns">
                        <div className="category-column">
                            <Field name="quantityLow" placeholder="From" type="number" label="Quantity" component={renderField} autocomplete="quantityLow" />
                        </div>
                        <div className="category-column">
                            <Field name="quantityHigh" placeholder="To" type="number" component={renderField} autocomplete="quantityHigh" />
                        </div>
                    </div>
                    <Field name="customer" placeholder="Select..." type="text" label="Customer" component={renderFieldSelect} options={customers} autocomplete="customer" />
                    <Field name="poNumber" placeholder="PO Number" type="number" label="PO Number" component={renderField} autocomplete="poNumber" />
                    <Field name="soNumber" placeholder="SO Number" type="number" label="SO Number" component={renderField} autocomplete="soNumber" />
                    <Field name="destinationCountry" placeholder="Select..." type="text" label="Destination Country" component={renderFieldSelect} options={destinationCountries} autocomplete="destinationCountry" />
                    <Field name="productType" placeholder="Select..." type="text" label="Product Type" component={renderFieldSelect} options={productTypes} autocomplete="productType" />
                    <div className="category-columns">
                        <div className="category-column">
                            <Field name="dueDateFrom" type="date" label="Due Date" placeholder="From" component={renderFieldDatePicker} autocomplete="dueDateFrom" />
                        </div>
                        <div className="category-column">
                            <Field name="dueDateTo" type="date" placeholder="To" component={renderFieldDatePicker} autocomplete="dueDateTo" />
                        </div>
                    </div>
                    <div className="category-columns">
                        <div className="category-column">
                            <Field name="orderDateFrom" type="date" label="Order Date" placeholder="From" component={renderFieldDatePicker} autocomplete="orderDateFrom" />
                        </div>
                        <div className="category-column">
                            <Field name="orderDateTo" type="date" placeholder="To" component={renderFieldDatePicker} autocomplete="orderDateTo" />
                        </div>
                    </div>
                </div>
                <button className="successButton" type="submit" disabled={pristine || invalid || submitting}>Submit { submitting && <Spinner />}</button>
            </form>
        </div>
    );
};

SearchIndexForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    brands: PropTypes.arrayOf(PropTypes.object).isRequired,
    customers: PropTypes.arrayOf(PropTypes.object).isRequired,
    destinationCountries: PropTypes.arrayOf(PropTypes.object).isRequired,
    productTypes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default reduxForm({ form: 'SearchIndexForm', validate })(SearchIndexForm);
