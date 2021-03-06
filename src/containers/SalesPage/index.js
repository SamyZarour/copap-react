import React, { Component } from 'react';
import './style.scss';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { getDateRange } from '../../utils';
import { userSelector } from '../../selectors/auth';
import { invoicesSelector } from '../../selectors/invoices';
import { tradersSelector } from '../../selectors/search';
import { RANGE_LABELS } from '../../constants/invoices';
import * as ACTIONS from '../../actions/invoices';
import * as ACTIONS_SEARCH from '../../actions/search';
import Spinner from '../../components/Spinner';
import SalesSummary from '../../components/SalesSummary';

class SalesPage extends Component {
    constructor(props) {
        super(props);
        this.setDateRange = this.setDateRange.bind(this);
        this.setTrader = this.setTrader.bind(this);
        this.state = { range: { label: RANGE_LABELS[1], value: 1 } };
    }

    componentWillMount() {
        const { range } = this.state;
        const { user: { username, role }, fetchInvoices, initSearch } = this.props;
        const isAdmin = role === 'admin';

        if (isAdmin) {
            initSearch({ traders: true });
        } else {
            fetchInvoices({ invoiceDateFrom: getDateRange(range.value), userId: username, isPaged: false, reset: true });
        }
    }

    setDateRange(range) {
        const { user: { role, username }, fetchInvoices } = this.props;
        const { trader } = this.state;
        const isAdmin = role === 'admin';
        const traderValue = trader ? trader.value : null;
        const userId = isAdmin ? traderValue : username;

        if (userId) {
            fetchInvoices({ invoiceDateFrom: getDateRange(range.value), userId, isPaged: false, reset: true });
        }

        this.setState({ range });
    }

    setTrader(trader) {
        const { range } = this.state;
        const { fetchInvoices } = this.props;

        fetchInvoices({ invoiceDateFrom: getDateRange(range.value), userId: trader.value, isPaged: false, reset: true });
        this.setState({ trader });
    }

    render() {
        const { range, trader } = this.state;
        const { user: { role }, invoices: { invoices, isBusy, isFetched }, traders } = this.props;
        const isAdmin = role === 'admin';

        return (
            <div className="SalesPage">
                <div>
                    <div>
                        <Select
                            className="inputSelector"
                            placeholder="Date Range..."
                            onChange={this.setDateRange}
                            value={range}
                            options={Object.keys(RANGE_LABELS).map(value => ({ label: RANGE_LABELS[value], value }))}
                            styles={({
                                control: provided => ({ ...provided, 'font-size': '14px' }),
                                option: provided => ({ ...provided, 'font-size': '14px' })
                            })}
                        />
                        {
                            isAdmin && (
                                <Select
                                    className="inputSelector"
                                    placeholder="Select Agent..."
                                    onChange={this.setTrader}
                                    value={trader}
                                    options={[{ label: 'All', value: null }, ...traders]}
                                    styles={({
                                        control: provided => ({ ...provided, 'font-size': '14px' }),
                                        option: provided => ({ ...provided, 'font-size': '14px' })
                                    })}
                                />
                            )
                        }
                        <div className="reportResult">
                            { (!trader && isAdmin) && <div>Please choose a trader</div> }
                            { (trader || !isAdmin) && (
                                (isBusy || !isFetched) ?
                                    <Spinner /> : <SalesSummary invoices={invoices} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: userSelector(state),
    invoices: invoicesSelector(state),
    traders: tradersSelector(state)
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
    initSearch: PropTypes.func.isRequired,
    fetchInvoices: PropTypes.func.isRequired,
    traders: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SalesPage));
