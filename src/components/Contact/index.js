import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './style.scss';


const Contact = ({
    CompanyNm,
    ContactNm,
    ProductTypes,
    LastPurchase,
    TotalQty,
    TotalSale,
    PhoneBusiness,
    PhoneMobile,
    Email,
    Addr1,
    Addr2,
    Addr3
}) => (
    <div className="Contact">
        <div className="rows">
            <div className="row head">
                Company Name : {CompanyNm}
            </div>
            <div className="row">
                <div className="column label">Product Types</div>
                <div className="column value">{ProductTypes.join(', ')}</div>
            </div>
            <div className="row">
                <div className="column label">Quantity</div>
                <div className="column value">{TotalQty}</div>
            </div>
            <div className="row">
                <div className="column label">Last Purchase</div>
                <div className="column value">{moment.utc(LastPurchase).format('YYYY-MM-DD')}</div>
            </div>
            <div className="row">
                <div className="column label">Address</div>
                <div className="column value">{`${Addr1}\n${Addr2}\n${Addr3}`}</div>
            </div>
            <div className="row">
                <div className="column label">Contact Person</div>
                <div className="column value">{ContactNm}</div>
            </div>
            <div className="row">
                <div className="column label">Phone Business</div>
                <div className="column value">{PhoneBusiness}</div>
            </div>
            <div className="row">
                <div className="column label">Phone Mobile</div>
                <div className="column value">{PhoneMobile}</div>
            </div>
            <div className="row">
                <div className="column label">Email</div>
                <div className="column value">{Email}</div>
            </div>
            <div className="row">
                <div className="column label">AmountPaid</div>
                <div className="column value">{TotalSale}</div>
            </div>
        </div>
    </div>
);

Contact.propTypes = {
    CompanyNm: PropTypes.string.isRequired,
    ContactNm: PropTypes.string.isRequired,
    TotalQty: PropTypes.string.isRequired,
    TotalSale: PropTypes.string.isRequired,
    Addr1: PropTypes.string.isRequired,
    Addr2: PropTypes.string.isRequired,
    Addr3: PropTypes.string.isRequired,
    PhoneBusiness: PropTypes.string.isRequired,
    PhoneMobile: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    LastPurchase: PropTypes.string.isRequired,
    ProductTypes: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Contact;
