import React, { Component } from 'react';
import './HomePage.scss';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userSelector } from '../../selectors/auth';
import { invoicesSelector } from '../../selectors/invoices';
import { brandsSelector, customersSelector, destinationCountriesSelector, productTypesSelector } from '../../selectors/search';
import List from '../../components/List';
import Invoice from '../../components/Invoice';
import * as ACTIONS from '../../actions/invoices';
import * as ACTIONS_SEARCH from '../../actions/search';
import SearchIndexForm from '../../forms/SearchIndexForm';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.setSearchCriteria = this.setSearchCriteria.bind(this);
        this.getNextPage = this.getNextPage.bind(this);
        this.state = { page: 0 };
    }

    componentWillMount() {
        this.props.resetInvoices();
        this.props.fetchBrands();
        this.props.fetchCustomers();
        this.props.fetchDestinationCountries();
        this.props.fetchProductTypes();
    }

    setSearchCriteria(criteria) {
        this.props.resetInvoices();
        const newState = { page: 0, ...criteria };
        this.setState(newState);
        const query = { ...newState, isAdmin: this.props.user.role === 'admin' };
        this.props.fetchInvoices(query);
    }

    getNextPage() {
        const newState = { ...this.state, page: this.state.page + 1 };
        this.setState(newState);
        this.props.fetchInvoices(newState);
    }

    render() {
        const { invoices: { invoices, isBusy, isEnd }, brands, customers, destinationCountries, productTypes } = this.props;
        return (
            <div className="HomePage">
                <SearchIndexForm onSubmit={this.setSearchCriteria} brands={brands} customers={customers} destinationCountries={destinationCountries} productTypes={productTypes} />
                <List isEnd={isEnd} isBusy={isBusy} list={invoices} ListItem={Invoice} onPaginatedSearch={this.getNextPage} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: userSelector(state),
    invoices: invoicesSelector(state),
    brands: brandsSelector(state),
    customers: customersSelector(state),
    destinationCountries: destinationCountriesSelector(state),
    productTypes: productTypesSelector(state)
});

const mapDispatchToProps = dispatch => ({
    fetchBrands: () => dispatch(ACTIONS_SEARCH.fetchBrands()),
    fetchCustomers: () => dispatch(ACTIONS_SEARCH.fetchCustomers()),
    fetchDestinationCountries: () => dispatch(ACTIONS_SEARCH.fetchDestinationCountries()),
    fetchProductTypes: () => dispatch(ACTIONS_SEARCH.fetchProductTypes()),
    resetInvoices: () => dispatch(ACTIONS.resetInvoices()),
    fetchInvoices: criteria => dispatch(ACTIONS.fetchIndexInvoices(criteria))
});

HomePage.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        role: PropTypes.string
    }).isRequired,
    fetchBrands: PropTypes.func.isRequired,
    fetchCustomers: PropTypes.func.isRequired,
    fetchDestinationCountries: PropTypes.func.isRequired,
    fetchProductTypes: PropTypes.func.isRequired,
    resetInvoices: PropTypes.func.isRequired,
    fetchInvoices: PropTypes.func.isRequired,
    invoices: PropTypes.shape({
        invoices: PropTypes.arrayOf(PropTypes.object).isRequired,
        isBusy: PropTypes.bool.isRequired,
        isEnd: PropTypes.bool.isRequired
    }).isRequired,
    brands: PropTypes.arrayOf(PropTypes.object).isRequired,
    customers: PropTypes.arrayOf(PropTypes.object).isRequired,
    destinationCountries: PropTypes.arrayOf(PropTypes.object).isRequired,
    productTypes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
