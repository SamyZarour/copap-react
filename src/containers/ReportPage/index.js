import React, { Component } from 'react';
import './style.scss';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { getDateRange } from '../../utils';
import { userSelector } from '../../selectors/auth';
import { tradersSelector } from '../../selectors/search';
import { invoicesSelector } from '../../selectors/invoices';
import { RANGE_LABELS } from '../../constants/invoices';
import * as ACTIONS from '../../actions/invoices';
import * as ACTIONS_SEARCH from '../../actions/search';
import Spinner from '../../components/Spinner';
import Report from '../../components/Report';

class ReportPage extends Component {
    constructor(props) {
        super(props);
        this.setDateRange = this.setDateRange.bind(this);
        this.setTrader = this.setTrader.bind(this);
        this.state = { range: { label: RANGE_LABELS[1], value: 1 } };
    }

    componentWillMount() {
        const { range } = this.state;
        const { user: { username, role }, resetInvoices, fetchInvoices, fetchTrader } = this.props;
        const isAdmin = role === 'admin';
        resetInvoices();
        if (isAdmin) {
            fetchTrader();
        } else {
            fetchInvoices({ orderDateFrom: getDateRange(range.value), userId: username, isPaged: false });
        }
    }

    setDateRange(range) {
        const { resetInvoices, fetchInvoices } = this.props;
        resetInvoices();
        fetchInvoices({ orderDateFrom: getDateRange(range.value), userId: this.props.user.username, isPaged: false });
        this.setState({ range });
    }

    setTrader(trader) {
        const { range } = this.state;
        const { resetInvoices, fetchInvoices } = this.props;

        resetInvoices();
        fetchInvoices({ orderDateFrom: getDateRange(range.value), userId: trader.value, isPaged: false });
        this.setState({ trader });
    }

    render() {
        const { range, trader } = this.state;
        const { user: { role }, invoices: { invoices, isBusy, isFetched }, traders } = this.props;
        const isAdmin = role === 'admin';

        return (
            <div className="ReportPage">
                <div>
                    <div>
                        <Select placeholder="Date Range..." onChange={this.setDateRange} value={range} options={Object.keys(RANGE_LABELS).map(value => ({ label: RANGE_LABELS[value], value }))} />
                        { isAdmin && <Select placeholder="Select Agent..." onChange={this.setTrader} value={trader} options={traders} /> }
                        <div className="reportResult">
                            { (!trader && isAdmin) && <div>Please choose a trader</div> }
                            { (trader || !isAdmin) && (((isBusy || !isFetched)) ? <Spinner /> : <Report invoices={invoices} />)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: userSelector(state),
    traders: tradersSelector(state),
    invoices: invoicesSelector(state)
});

const mapDispatchToProps = dispatch => ({
    resetInvoices: () => dispatch(ACTIONS.resetInvoices()),
    fetchInvoices: criteria => dispatch(ACTIONS.fetchCustomerInvoices(criteria)),
    fetchTrader: () => dispatch(ACTIONS_SEARCH.fetchTraders())
});

ReportPage.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        role: PropTypes.string
    }).isRequired,
    invoices: PropTypes.shape({
        invoices: PropTypes.arrayOf(PropTypes.object).isRequired,
        isFetched: PropTypes.bool.isRequired,
        isBusy: PropTypes.bool.isRequired
    }).isRequired,
    resetInvoices: PropTypes.func.isRequired,
    fetchInvoices: PropTypes.func.isRequired,
    fetchTrader: PropTypes.func.isRequired,
    traders: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportPage));
