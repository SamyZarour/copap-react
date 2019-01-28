import React from 'react';
import './HomePage.scss';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userSelector } from '../../selectors/auth';
import { invoicesSelector } from '../../selectors/invoices';
import Search from '../../components/Search';
import Invoice from '../../components/Invoice';
import Spinner from '../../components/Spinner';
import * as ACTIONS from '../../actions/invoices';

const HomePage = ({ fetchInvoices, invoices: { invoices, isBusy } }) => (
    <div className="HomePage">
        <Search placeholder="Search" handleChange={fetchInvoices} />
        {
            (() => {
                if (isBusy) { return <Spinner />; }
                if (invoices.length === 0) { return <div className="noInvoices">No Invoices</div>; }
                return invoices.map(invoice => <Invoice {...invoice} key={invoice.PayableID} />);
            })()
        }
    </div>
);

const mapStateToProps = state => ({
    user: userSelector(state),
    invoices: invoicesSelector(state)
});

const mapDispatchToProps = dispatch => ({
    fetchInvoices: query => dispatch(ACTIONS.fetchInvoices({ query }))
});

HomePage.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired
    }).isRequired,
    fetchInvoices: PropTypes.func.isRequired,
    invoices: PropTypes.shape({
        invoices: PropTypes.arrayOf(PropTypes.object).isRequired,
        isBusy: PropTypes.bool.isRequired
    }).isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
