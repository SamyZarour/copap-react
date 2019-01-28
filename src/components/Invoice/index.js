import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Invoice.scss';


const Invoice = ({
    PayableID,
    Client,
    Commission1,
    DueDate,
    InvoiceNumber,
    OrderDate,
    PricePerUnitBuy,
    PricePerUnitSale,
    ProductType,
    QTY,
    SalesPriceSale,
    Supplier
}) => (
    <div className="Invoice">
        <div className="rows">
            <div className="row head">
                Payable ID : {PayableID}
            </div>
            <div className="row">
                <div className="column label">Client</div>
                <div className="column value">{Client}</div>
            </div>
            <div className="row">
                <div className="column label">Commission</div>
                <div className="column value">{Commission1}</div>
            </div>
            <div className="row">
                <div className="column label">Due Date</div>
                <div className="column value">{moment(DueDate).format('YYYY-MM-DD')}</div>
            </div>
            <div className="row">
                <div className="column label">Invoice Number</div>
                <div className="column value">{InvoiceNumber}</div>
            </div>
            <div className="row">
                <div className="column label">Order Date</div>
                <div className="column value">{moment(OrderDate).format('YYYY-MM-DD')}</div>
            </div>
            <div className="row">
                <div className="column label">Price Per Unit (Buy)</div>
                <div className="column value">{PricePerUnitBuy}</div>
            </div>
            <div className="row">
                <div className="column label">Price Per Unit Sale</div>
                <div className="column value">{PricePerUnitSale}</div>
            </div>
            <div className="row">
                <div className="column label">Product Type</div>
                <div className="column value">{ProductType}</div>
            </div>
            <div className="row">
                <div className="column label">QTY</div>
                <div className="column value">{QTY}</div>
            </div>
            <div className="row">
                <div className="column label">Sales Price Sale</div>
                <div className="column value">{SalesPriceSale}</div>
            </div>
            <div className="row">
                <div className="column label">Supplier</div>
                <div className="column value">{Supplier}</div>
            </div>
        </div>
    </div>
);

Invoice.propTypes = {
    PayableID: PropTypes.number.isRequired,
    Client: PropTypes.string.isRequired,
    Commission1: PropTypes.number.isRequired,
    DueDate: PropTypes.string.isRequired,
    InvoiceNumber: PropTypes.string.isRequired,
    OrderDate: PropTypes.string.isRequired,
    PricePerUnitBuy: PropTypes.string.isRequired,
    PricePerUnitSale: PropTypes.string.isRequired,
    ProductType: PropTypes.string.isRequired,
    QTY: PropTypes.number.isRequired,
    SalesPriceSale: PropTypes.number.isRequired,
    Supplier: PropTypes.string.isRequired
};

export default Invoice;
