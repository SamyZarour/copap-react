import React, { Component } from 'react';
import './style.scss';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userSelector } from '../../selectors/auth';
import { invoicesSelector } from '../../selectors/invoices';
import {
    brandsSelector,
    customersSelector,
    destinationCountriesSelector,
    productTypesSelector
} from '../../selectors/search';
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
        this.state = {};
    }

    componentWillMount() {
        this.props.initSearch({ brands: true, customers: true, productTypes: true, destinationCountries: true });
    }

    setBrand(brand) {
        this.setState(brand);
    }

    setSearchCriteria(criteria) {
        const { user: { role } } = this.props;
        const newState = { ...this.state, ...criteria };
        this.setState(newState);
        const query = { ...newState, isAdmin: role === 'admin', page: 1 };
        this.props.fetchInvoices({ ...query, reset: true });
    }

    getNextPage() {
        const { invoices: { page }, user: { role } } = this.props;
        this.props.fetchInvoices({ ...this.state, isAdmin: role === 'admin', page: page + 1 });
    }

    render() {
        const { invoices: { invoices, totalCount, isBusy, isEnd }, brands, customers, productTypes, destinationCountries } = this.props;
        return (
            <div className="BrandSearchPage">
                {
                    this.state.brand ?
                        (
                            <div>
                                <h1>{brands.length > 0 && brands.find(brand => brand.value === this.state.brand).label}</h1>
                                <button type="button" className="cancelButton" onClick={() => this.setBrand({ brand: undefined })}>Change Brand</button>
                                <SearchBrandForm onSubmit={this.setSearchCriteria} customers={customers} productTypes={productTypes} destinationCountries={destinationCountries} />
                                { invoices.length > 0 && <h3>Found {totalCount} Invoices</h3> }
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
    productTypes: productTypesSelector(state),
    destinationCountries: destinationCountriesSelector(state)
});

const mapDispatchToProps = dispatch => ({
    initSearch: fields => dispatch(ACTIONS_SEARCH.initSearch(fields)),
    fetchInvoices: criteria => dispatch(ACTIONS.fetchBrandInvoices(criteria))
});

BrandSearchPage.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        role: PropTypes.string
    }).isRequired,
    initSearch: PropTypes.func.isRequired,
    fetchInvoices: PropTypes.func.isRequired,
    invoices: PropTypes.shape({
        invoices: PropTypes.arrayOf(PropTypes.object).isRequired,
        isBusy: PropTypes.bool.isRequired,
        isEnd: PropTypes.bool.isRequired
    }).isRequired,
    brands: PropTypes.arrayOf(PropTypes.object).isRequired,
    customers: PropTypes.arrayOf(PropTypes.object).isRequired,
    productTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
    destinationCountries: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BrandSearchPage));
