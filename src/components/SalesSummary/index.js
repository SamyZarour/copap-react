import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from '../../utils';
import './style.scss';

const getSalesSummaryValues = invoices => invoices.reduce((acc, current) => {
    const { ShippingDate, DeliveryDate, SaleBalanceDue, TotalSale } = current;

    const isShipped = new Date(ShippingDate) < new Date();
    const isDelivered = new Date(DeliveryDate) < new Date();
    const isPaid = SaleBalanceDue === 0;

    return {
        shipped: isShipped ? acc.shipped + 1 : acc.shipped,
        notShipped: !isShipped ? acc.notShipped + 1 : acc.notShipped,
        shippedNotPaid: (isShipped && !isDelivered) ? acc.shippedNotPaid + 1 : acc.shippedNotPaid,
        sales: acc.sales + TotalSale,
        purchases: !isShipped ? acc.purchases + TotalSale : acc.purchases,
        arSummary: !isPaid ? acc.arSummary + TotalSale : acc.arSummary
    };
}, { shipped: 0, notShipped: 0, shippedNotPaid: 0, sales: 0, purchases: 0, arSummary: 0 });

const SalesSummary = ({
    invoices
}) => {
    const { shippedNotPaid, sales, purchases, arSummary } = getSalesSummaryValues(invoices);

    return (
        <div className="SalesSummary">
            <div className="rows">
                <div className="row numberValue">
                    <div className="column label">A/R Summary</div>
                    <div className="column value">{formatNumber((Math.round(arSummary * 100) / 100) || 0)} $</div>
                </div>
                <div className="row numberValue">
                    <div className="column label">Sales</div>
                    <div className="column value">{formatNumber((Math.round(sales * 100) / 100) || 0)} $</div>
                </div>
                <div className="row numberValue">
                    <div className="column label">Purchases</div>
                    <div className="column value">{formatNumber((Math.round(purchases * 100) / 100) || 0)} $</div>
                </div>
                <div className="row numberValue">
                    <div className="column label">Open Shipments</div>
                    <div className="column value">{shippedNotPaid}</div>
                </div>
            </div>
        </div>
    );
};

SalesSummary.propTypes = {
    invoices: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default SalesSummary;
