import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Invoice.scss';


const Invoice = ({
    Client,
    Commission,
    DueDate,
    InvoiceNo,
    OrderDate,
    PriceBuy,
    PriceUomBuy,
    CurrencyBuy,
    PriceSale,
    PriceUomSale,
    CurrencySale,
    ProductType,
    Qty,
    QtyUom,
    TotalSale,
    Supplier,
    SalesRep,
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
            <div className="row">
                <div className="column label">Order Date</div>
                <div className="column value">{moment(OrderDate).format('YYYY-MM-DD')}</div>
            </div>
            <div className="row">
                <div className="column label">Product Type</div>
                <div className="column value">{ProductType}</div>
            </div>
            <div className="row">
                <div className="column label">Supplier</div>
                <div className="column value">{Supplier}</div>
            </div>
            <div className="row">
                <div className="column label">QTY</div>
                <div className="column value">{Qty} {QtyUom || ''}</div>
            </div>
            <div className="row">
                <div className="column label">Sales Price</div>
                <div className="column value">{TotalSale} {PriceUomSale || ''}</div>
            </div>
            <div className="row">
                <div className="column label">Sales Price Per Unit</div>
                <div className="column value">{PriceSale} {PriceUomSale || ''} {CurrencySale || ''}</div>
            </div>
            { PriceBuy && PriceUomBuy && CurrencyBuy && (
                <div className="row">
                    <div className="column label">Buying Price Per Unit</div>
                    <div className="column value">{PriceBuy} {PriceUomBuy || ''} {CurrencyBuy || ''}</div>
                </div>
            )}
            <div className="row">
                <div className="column label">Due Date</div>
                <div className="column value">{moment(DueDate).format('YYYY-MM-DD')}</div>
            </div>
            <div className="row">
                <div className="column label">Commission</div>
                <div className="column value">{Commission}</div>
            </div>
            <div className="row">
                <div className="column label">Sales Rep</div>
                <div className="column value">{SalesRep}</div>
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
    Commission: PropTypes.number.isRequired,
    DueDate: PropTypes.string.isRequired,
    OrderDate: PropTypes.string.isRequired,
    PriceSale: PropTypes.number.isRequired,
    PriceUomSale: PropTypes.string.isRequired,
    CurrencySale: PropTypes.string.isRequired,
    PriceBuy: PropTypes.number,
    PriceUomBuy: PropTypes.string,
    CurrencyBuy: PropTypes.string,
    ProductType: PropTypes.string.isRequired,
    Qty: PropTypes.number.isRequired,
    QtyUom: PropTypes.string.isRequired,
    TotalSale: PropTypes.number.isRequired,
    Supplier: PropTypes.string.isRequired,
    SalesRep: PropTypes.string.isRequired,
    ContactPoint: PropTypes.string.isRequired
};

export default Invoice;
