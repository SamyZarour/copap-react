import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { renderField, renderFieldSelect, renderFieldDatePicker } from '../utils';
import Spinner from '../../components/Spinner/index';
import './style.scss';

const invoiceOptions = [
    {
        label: 'Paid',
        value: '1'
    },
    {
        label: 'Unpaid',
        value: '0'
    }
];

const validate = values => {
    const errors = {};

    if (values.valueLow && values.valueHigh && values.valueLow > values.valueHigh) {
        errors.valueLow = 'From value must be smaller than To Value';
    }

    if (values.dueDateFrom && values.dueDateTo && new Date(values.dueDateFrom) > new Date(values.dueDateTo)) {
        errors.dueDateFrom = 'From value must be smaller than To Value';
    }

    if (values.orderDateFrom && values.orderDateTo && new Date(values.orderDateFrom) > new Date(values.orderDateTo)) {
        errors.orderDateFrom = 'From value must be smaller than To Value';
    }

    return errors;
};

const SearchBrandForm = props => {
    const {
        handleSubmit,
        invalid,
        submitting,
        pristine,
        customers,
        productTypes,
        reset
    } = props;

    return (
        <div className="SearchBrandForm">
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
                    <div className="category-columns">
                        <div className="category-column">
                            <Field name="dueDateFrom" type="date" label="Due Date" placeholder="From" component={renderFieldDatePicker} autocomplete="dueDateFrom" />
                        </div>
                        <div className="category-column">
                            <Field name="dueDateTo" type="date" placeholder="To" component={renderFieldDatePicker} autocomplete="dueDateTo" />
                        </div>
                    </div>
                    <Field name="invoiceNumber" placeholder="Invoice Number" type="number" label="Invoice Number" component={renderField} autocomplete="invoiceNumber" />
                    <Field name="invoiceType" placeholder="Select..." type="text" label="Invoice Status" component={renderFieldSelect} options={invoiceOptions} autocomplete="invoiceType" />
                    <div className="category-columns">
                        <div className="category-column">
                            <Field name="valueLow" placeholder="From" type="number" label="Quantity" component={renderField} autocomplete="valueLow" />
                        </div>
                        <div className="category-column">
                            <Field name="valueHigh" placeholder="To" type="number" component={renderField} autocomplete="valueHigh" />
                        </div>
                    </div>
                    <Field name="customer" placeholder="Select..." type="text" label="Customer" component={renderFieldSelect} options={customers} autocomplete="customer" />
                </div>
                <div className="form-buttons">
                    <button className="successButton" type="submit" disabled={pristine || invalid || submitting}>Submit { submitting && <Spinner />}</button>
                    <button className="cancelButton" type="button" disabled={submitting} onClick={reset}>Reset</button>
                </div>
            </form>
        </div>
    );
};

SearchBrandForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    customers: PropTypes.arrayOf(PropTypes.object).isRequired,
    productTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
    reset: PropTypes.func.isRequired
};

export default reduxForm({ form: 'SearchBrandForm', validate })(SearchBrandForm);
