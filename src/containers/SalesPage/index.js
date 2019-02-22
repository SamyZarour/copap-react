import React, { Component } from 'react';
import './style.scss';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { getDateRange } from '../../utils';
import { userSelector } from '../../selectors/auth';
import { invoicesSelector } from '../../selectors/invoices';
import { RANGE_LABELS } from '../../constants/invoices';
import * as ACTIONS from '../../actions/invoices';
import * as ACTIONS_SEARCH from '../../actions/search';
import Spinner from '../../components/Spinner';
import SalesSummary from '../../components/SalesSummary';

class SalesPage extends Component {
    constructor(props) {
        super(props);
        this.setDateRange = this.setDateRange.bind(this);
        this.state = { range: { label: RANGE_LABELS[1], value: 1 } };
    }

    componentWillMount() {
        const { range } = this.state;
        const { user: { username }, fetchInvoices } = this.props;

        fetchInvoices({ orderDateFrom: getDateRange(range.value), userId: username, isPaged: false, reset: true });
    }

    setDateRange(range) {
        const { fetchInvoices } = this.props;
        fetchInvoices({ orderDateFrom: getDateRange(range.value), userId: this.props.user.username, isPaged: false, reset: true });
        this.setState({ range });
    }

    render() {
        const { range } = this.state;
        const { invoices: { invoices, isBusy, isFetched } } = this.props;

        return (
            <div className="SalesPage">
                <div>
                    <div>
                        <Select placeholder="Date Range..." onChange={this.setDateRange} value={range} options={Object.keys(RANGE_LABELS).map(value => ({ label: RANGE_LABELS[value], value }))} />
                        <div className="reportResult">
                            {
                                ((isBusy || !isFetched)) ?
                                    <Spinner /> : <SalesSummary invoices={invoices} />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: userSelector(state),
    invoices: invoicesSelector(state)
});

const mapDispatchToProps = dispatch => ({
    initSearch: fields => dispatch(ACTIONS_SEARCH.initSearch(fields)),
    fetchInvoices: criteria => dispatch(ACTIONS.fetchCustomerInvoices(criteria))
});

SalesPage.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        role: PropTypes.string
    }).isRequired,
    invoices: PropTypes.shape({
        invoices: PropTypes.arrayOf(PropTypes.object).isRequired,
        isFetched: PropTypes.bool.isRequired,
        isBusy: PropTypes.bool.isRequired
    }).isRequired,
    fetchInvoices: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SalesPage));
