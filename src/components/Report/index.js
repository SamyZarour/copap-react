import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from '../../utils';
import './style.scss';

const getReportValues = invoices => invoices.reduce((acc, current) => {
    const { ProductType, TotalSale, Qty, ShipFromID, Client } = current;
    return {
        categories: {
            ...acc.categories,
            [ProductType]: (acc.categories[ProductType] || 0) + TotalSale
        },
        totalQty: acc.totalQty + Qty,
        totalValue: acc.totalValue + TotalSale,
        countries: [...acc.countries, ...(!acc.countries.includes(ShipFromID) ? [ShipFromID] : [])],
        clients: [...acc.clients, ...(!acc.clients.includes(Client) ? [Client] : [])]
    };
}, { categories: {}, totalQty: 0, totalValue: 0, countries: [], clients: [] });

const Report = ({
    invoices
}) => {
    const { categories, totalQty, totalValue, countries, clients } = getReportValues(invoices);

    return (
        <div className="Report">
            <div className="rows">
                <div className="row numberValue">
                    <div className="column label">Product Types</div>
                    <div className="column value">{Object.keys(categories).length}</div>
                </div>
                <div className="row">
                    <div className="column label">Categories</div>
                    <div className="column">
                        { Object.keys(categories).map(category => (
                            <div className="row category numberValue" key={category}>
                                <div className="column label">{category}</div>
                                <div className="column value">{Math.round(10000 * categories[category] / totalValue) / 100}%</div>
                            </div>
                        )) }
                    </div>
                </div>
                <div className="row numberValue">
                    <div className="column label">QTY</div>
                    <div className="column value">{formatNumber((Math.round(totalQty * 100) / 100) || 0)}</div>
                </div>
                <div className="row numberValue">
                    <div className="column label">Invoice Amount</div>
                    <div className="column value">{invoices.length}</div>
                </div>
                <div className="row numberValue">
                    <div className="column label">Value</div>
                    <div className="column value">{formatNumber((Math.round(totalValue * 100) / 100) || 0)}</div>
                </div>
                <div className="row numberValue">
                    <div className="column label">Countries</div>
                    <div className="column value">{countries.length}</div>
                </div>
                <div className="row numberValue">
                    <div className="column label">Clients Amount</div>
                    <div className="column value">{clients.length}</div>
                </div>
            </div>
        </div>
    );
};

Report.propTypes = {
    invoices: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Report;
