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
import Spinner from '../../components/Spinner';
import Report from '../../components/Report';

class ReportPage extends Component {
    constructor(props) {
        super(props);
        this.setDateRange = this.setDateRange.bind(this);
        this.state = { selectedDateRange: { label: RANGE_LABELS[1], value: 1 } };
    }

    componentWillMount() {
        const { selectedDateRange } = this.state;
        this.props.resetInvoices();
        this.props.fetchInvoices({ orderDateFrom: getDateRange(selectedDateRange.value), userId: this.props.user.username, isPaged: false });
    }

    setDateRange(range) {
        this.props.resetInvoices();
        this.props.fetchInvoices({ orderDateFrom: getDateRange(range.value), userId: this.props.user.username, isPaged: false });
        this.setState({ selectedDateRange: range });
    }

    render() {
        const { selectedDateRange } = this.state;
        const { user, invoices: { invoices, isBusy, isFetched } } = this.props;

        return (
            <div className="ReportPage">
                <div>
                    <div>
                        <Select placeholder="Date Range..." onChange={this.setDateRange} value={selectedDateRange} options={Object.keys(RANGE_LABELS).map(value => ({ label: RANGE_LABELS[value], value }))} />
                        { (isBusy || !isFetched) ? <Spinner /> : <Report user={user} invoices={invoices} /> }
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
    resetInvoices: () => dispatch(ACTIONS.resetInvoices()),
    fetchInvoices: criteria => dispatch(ACTIONS.fetchCustomerInvoices(criteria))
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
    fetchInvoices: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportPage));
