import React, { Component } from 'react';
import './style.scss';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userSelector } from '../../selectors/auth';
import { invoicesSelector } from '../../selectors/invoices';
import { brandsSelector, customersSelector, productTypesSelector } from '../../selectors/search';
import List from '../../components/List';
import Invoice from '../../components/Invoice';
import * as ACTIONS from '../../actions/invoices';
import * as ACTIONS_SEARCH from '../../actions/search';
import SearchBrandForm from '../../forms/SearchBrandForm';
import SelectBrandForm from '../../forms/SelectBrandForm';

class BrandSearchPage extends Component {
    constructor(props) {
        super(props);
        this.setBrand = this.setBrand.bind(this);
        this.setSearchCriteria = this.setSearchCriteria.bind(this);
        this.getNextPage = this.getNextPage.bind(this);
        this.state = { page: 0 };
    }

    componentWillMount() {
        this.props.resetInvoices();
        this.props.fetchBrands();
        this.props.fetchCustomers();
        this.props.fetchProductTypes();
    }

    setBrand(brand) {
        this.setState(brand);
    }

    setSearchCriteria(criteria) {
        this.props.resetInvoices();
        const newState = { ...this.state, ...criteria, page: 0 };
        this.setState(newState);
        this.props.fetchInvoices(newState);
    }

    getNextPage() {
        const newState = { ...this.state, page: this.state.page + 1 };
        this.setState(newState);
        this.props.fetchInvoices(newState);
    }

    render() {
        const { invoices: { invoices, isBusy, isEnd }, brands, customers, productTypes } = this.props;
        return (
            <div className="BrandSearchPage">
                {
                    this.state.brand ?
                        (
                            <div>
                                <h1>{brands.find(brand => brand.value === this.state.brand).label}</h1>
                                <SearchBrandForm onSubmit={this.setSearchCriteria} customers={customers} productTypes={productTypes} /> :
                                <List isEnd={isEnd} isBusy={isBusy} list={invoices} ListItem={Invoice} onPaginatedSearch={this.getNextPage} />
                            </div>
                        ) :
                        <SelectBrandForm onSubmit={this.setBrand} brands={brands} />
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: userSelector(state),
    invoices: invoicesSelector(state),
    brands: brandsSelector(state),
    customers: customersSelector(state),
    productTypes: productTypesSelector(state)
});

const mapDispatchToProps = dispatch => ({
    fetchBrands: () => dispatch(ACTIONS_SEARCH.fetchBrands()),
    fetchCustomers: () => dispatch(ACTIONS_SEARCH.fetchCustomers()),
    fetchProductTypes: () => dispatch(ACTIONS_SEARCH.fetchProductTypes()),
    resetInvoices: () => dispatch(ACTIONS.resetInvoices()),
    fetchInvoices: criteria => dispatch(ACTIONS.fetchBrandInvoices(criteria))
});

BrandSearchPage.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired
    }).isRequired,
    fetchBrands: PropTypes.func.isRequired,
    fetchCustomers: PropTypes.func.isRequired,
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
    productTypes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BrandSearchPage));
