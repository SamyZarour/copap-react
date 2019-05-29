import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { formatNumber } from '../../utils';
import './Invoice.scss';


const Invoice = ({
    Client,
    DueDate,
    InvoiceNo,
    InvoiceDate,
    OrderDate,
    PriceBuy,
    PriceUomBuy,
    CurrencyBuy,
    PriceSale,
    CurrencySale,
    ProductType,
    Qty,
    TotalSale,
    Supplier,
    SalesRep,
    BuyRep,
    ContactPoint
}) => (
    <div className="Invoice">
        <div className="rows">
            <div className="row head">
                Invoice No : {InvoiceNo}
            </div>
            <div className="row">
                <div className="column label">Client</div>
                <div className="column value">{Client}</div>
            </div>
            <div className="row numberValue">
                <div className="column label">Order Date</div>
                <div className="column value">{moment.utc(OrderDate).format('YYYY-MM-DD')}</div>
            </div>
            <div className="row numberValue">
                <div className="column label">Invoice Date</div>
                <div className="column value">{moment.utc(InvoiceDate).format('YYYY-MM-DD')}</div>
            </div>
            <div className="row">
                <div className="column label">Product Type</div>
                <div className="column value">{ProductType}</div>
            </div>
            <div className="row">
                <div className="column label">Supplier</div>
                <div className="column value">{Supplier}</div>
            </div>
            <div className="row numberValue">
                <div className="column label">QTY</div>
                <div className="column value">{formatNumber(Qty || 0)}</div>
            </div>
            <div className="row numberValue">
                <div className="column label">Sales Price</div>
                <div className="column value">{formatNumber(TotalSale || 0)} {CurrencySale || ''}</div>
            </div>
            <div className="row numberValue">
                <div className="column label">Sales Price Per Unit</div>
                <div className="column value">{formatNumber(PriceSale || 0)} {CurrencySale || ''}</div>
            </div>
            { !!PriceBuy && PriceUomBuy && CurrencyBuy && (
                <div className="row numberValue">
                    <div className="column label">Buying Price Per Unit</div>
                    <div className="column value">{formatNumber(PriceBuy || 0)} {CurrencyBuy || ''}</div>
                </div>
            )}
            <div className="row numberValue">
                <div className="column label">Due Date</div>
                <div className="column value">{moment.utc(DueDate).format('YYYY-MM-DD')}</div>
            </div>
            <div className="row">
                <div className="column label">Sales Rep</div>
                <div className="column value">{SalesRep}</div>
            </div>
            <div className="row">
                <div className="column label">Sales Rep 2</div>
                <div className="column value">{BuyRep}</div>
            </div>
            <div className="row">
                <div className="column label">Contact Point</div>
                <div className="column value">{ContactPoint}</div>
            </div>
        </div>
    </div>
);

Invoice.propTypes = {
    InvoiceNo: PropTypes.string.isRequired,
    Client: PropTypes.string.isRequired,
    DueDate: PropTypes.string.isRequired,
    InvoiceDate: PropTypes.string.isRequired,
    OrderDate: PropTypes.string.isRequired,
    PriceSale: PropTypes.number.isRequired,
    CurrencySale: PropTypes.string.isRequired,
    PriceBuy: PropTypes.number,
    PriceUomBuy: PropTypes.string,
    CurrencyBuy: PropTypes.string,
    ProductType: PropTypes.string.isRequired,
    Qty: PropTypes.number.isRequired,
    TotalSale: PropTypes.number.isRequired,
    Supplier: PropTypes.string.isRequired,
    SalesRep: PropTypes.string.isRequired,
    BuyRep: PropTypes.string.isRequired,
    ContactPoint: PropTypes.string.isRequired
};

export default Invoice;
