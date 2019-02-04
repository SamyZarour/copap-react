import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { renderFieldSelect } from '../utils';
import Spinner from '../../components/Spinner/index';
import './style.scss';

const SelectCustomerForm = props => {
    const {
        handleSubmit,
        invalid,
        submitting,
        pristine,
        customers
    } = props;

    return (
        <div className="SelectCustomerForm">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="title">Select A Customer</h2>
                <div className="fields">
                    <Field name="customer" placeholder="Select..." type="text" label="Customers" component={renderFieldSelect} options={customers} autocomplete="customer" />
                </div>
                <button className="successButton" type="submit" disabled={pristine || invalid || submitting}>Submit { submitting && <Spinner />}</button>
            </form>
        </div>
    );
};

SelectCustomerForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    customers: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default reduxForm({ form: 'SelectCustomerForm' })(SelectCustomerForm);
