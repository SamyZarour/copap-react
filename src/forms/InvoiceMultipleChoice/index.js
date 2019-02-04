import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { renderFieldSelect } from '../utils';
import './style.scss';

const InvoiceMultipleChoice = props => {
    const {
        onChange,
        invoices
    } = props;

    return (
        <div className="InvoiceMultipleChoice">
            <form className="form">
                <div className="fields">
                    <Field name="invoices" placeholder="Select..." type="text" label="Invoices" onChange={onChange} isMulti component={renderFieldSelect} options={invoices} autocomplete="invoices" />
                </div>
            </form>
        </div>
    );
};

InvoiceMultipleChoice.propTypes = {
    onChange: PropTypes.func.isRequired,
    invoices: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default reduxForm({ form: 'InvoiceMultipleChoice' })(InvoiceMultipleChoice);
