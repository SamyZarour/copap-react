import React, { Component } from 'react';
import './style.scss';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userSelector } from '../../selectors/auth';
import { invoicesSelector } from '../../selectors/invoices';
import { customersSelector, productTypesSelector } from '../../selectors/search';
import * as ACTIONS from '../../actions/invoices';
import * as ACTIONS_SEARCH from '../../actions/search';
import SearchBrandForm from '../../forms/SearchBrandForm';
import SelectCustomerForm from '../../forms/SelectCustomerForm';
import List from '../../components/List';
import Invoice from '../../components/Invoice';

class CustomerSearchPage extends Component {
    constructor(props) {
        super(props);
        this.setCustomer = this.setCustomer.bind(this);
        this.setSearchCriteria = this.setSearchCriteria.bind(this);
        this.getNextPage = this.getNextPage.bind(this);
        this.state = {};
    }

    componentWillMount() {
        this.props.initSearch({ customers: true, productTypes: true });
    }

    setCustomer(customer) {
        this.setState(customer);
    }

    setSearchCriteria(criteria) {
        const { user: { username, role } } = this.props;
        const newState = { ...this.state, ...criteria };
        this.setState(newState);
        const isAdmin = role === 'admin';
        const query = {
            ...newState,
            ...(isAdmin ? {} : { userId: username }),
            isAdmin,
            page: 1
        };
        this.props.fetchInvoices({ ...query, reset: true });
    }

    getNextPage() {
        const { invoices: { page }, user: { username, role } } = this.props;
        const isAdmin = role === 'admin';
        this.props.fetchInvoices({
            ...this.state,
            ...(isAdmin ? {} : { userId: username }),
            isAdmin,
            page: page + 1
        });
    }

    render() {
        const { invoices: { invoices, totalCount, isBusy, isEnd }, customers, productTypes } = this.props;
        const { customer } = this.state;
        return (
            <div className="CustomerSearchPage">
                {
                    customer ?
                        (
                            <div>
                                <h1>{customers.length > 0 && customers.find(c => c.value === customer).label}</h1>
                                <button type="button" className="cancelButton" onClick={() => this.setCustomer({ customer: undefined })}>Change Customer</button>
                                <SearchBrandForm onSubmit={this.setSearchCriteria} customers={customers} productTypes={productTypes} />
                                { invoices.length > 0 && <h3>Found {totalCount} Invoices</h3> }
                                <List isEnd={isEnd} isBusy={isBusy} list={invoices} ListItem={Invoice} onPaginatedSearch={this.getNextPage} />
                            </div>
                        ) :
                        <SelectCustomerForm onSubmit={this.setCustomer} customers={customers} />
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: userSelector(state),
    invoices: invoicesSelector(state),
    customers: customersSelector(state),
    productTypes: productTypesSelector(state)
});

const mapDispatchToProps = dispatch => ({
    initSearch: fields => dispatch(ACTIONS_SEARCH.initSearch(fields)),
    fetchInvoices: criteria => dispatch(ACTIONS.fetchCustomerInvoices(criteria))
});

CustomerSearchPage.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        role: PropTypes.string
    }).isRequired,
    initSearch: PropTypes.func.isRequired,
    fetchInvoices: PropTypes.func.isRequired,
    invoices: PropTypes.shape({
        invoices: PropTypes.arrayOf(PropTypes.object).isRequired,
        totalCount: PropTypes.number.isRequired,
        isBusy: PropTypes.bool.isRequired,
        isEnd: PropTypes.bool.isRequired
    }).isRequired,
    customers: PropTypes.arrayOf(PropTypes.object).isRequired,
    productTypes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerSearchPage));
