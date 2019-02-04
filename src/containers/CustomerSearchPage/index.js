import React, { Component } from 'react';
import './style.scss';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import PieChart from 'react-minimal-pie-chart';
import { userSelector } from '../../selectors/auth';
import { invoiceListPieChartSelector } from '../../selectors/invoices';
import { customersSelector, productTypesSelector } from '../../selectors/search';
import * as ACTIONS from '../../actions/invoices';
import * as ACTIONS_SEARCH from '../../actions/search';
import SearchCustomerForm from '../../forms/SearchCustomerForm';
import SelectCustomerForm from '../../forms/SelectCustomerForm';

class CustomerSearchPage extends Component {
    constructor(props) {
        super(props);
        this.setCustomer = this.setCustomer.bind(this);
        this.setInvoices = this.setInvoices.bind(this);
        this.setSearchCriteria = this.setSearchCriteria.bind(this);
        this.state = { selectedInvoices: [] };
    }

    componentWillMount() {
        this.props.resetInvoices();
        this.props.fetchCustomers();
        this.props.fetchProductTypes();
    }

    setCustomer(customer) {
        this.setState(customer);
    }

    setSearchCriteria(criteria) {
        this.props.resetInvoices();
        const newState = { ...this.state, ...criteria, selectedInvoices: [] };
        this.setState(newState);
        const query = { ...newState, isAdmin: this.props.user.role === 'admin' };
        this.props.fetchInvoices(query);
    }

    setInvoices(selectedInvoices) {
        this.setState({ selectedInvoices });
    }

    render() {
        const { invoices, customers, productTypes } = this.props;
        const { customer, selectedInvoices } = this.state;
        return (
            <div className="CustomerSearchPage">
                {
                    customer ?
                        (
                            <div>
                                <h1>{customers.length > 0 && customers.find(c => c.value === customer).label}</h1>
                                <button type="button" className="cancelButton" onClick={() => this.setCustomer({ customer: undefined })}>Change Customer</button>
                                <SearchCustomerForm onSubmit={this.setSearchCriteria} customers={customers} productTypes={productTypes} />
                                <Select isMulti placeholder="Select Invoices..." onChange={this.setInvoices} value={selectedInvoices} closeMenuOnSelect={false} options={invoices} />
                                { selectedInvoices.length > 0 ?
                                    (
                                        <div>
                                            <div className="pieChartLegend">
                                                { selectedInvoices.map(item => (
                                                    <div className="pieChartItem">
                                                        <div className="pieChartItemColor" style={({ backgroundColor: item.color })} />
                                                        <div className="pieChartItemLabel">{item.title}</div>
                                                    </div>
                                                )) }
                                            </div>
                                            <PieChart className="pieChart" data={selectedInvoices} />
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="pieChartLegend">
                                                { [{ title: 'Blank', value: 1, color: '#757575' }].map(item => (
                                                    <div className="pieChartItem">
                                                        <div className="pieChartItemColor" style={({ backgroundColor: item.color })} />
                                                        <div className="pieChartItemLabel">{item.title}</div>
                                                    </div>
                                                )) }
                                            </div>
                                            <PieChart className="pieChart" data={[{ title: 'Blank', value: 1, color: '#757575' }]} />
                                        </div>
                                    )
                                }
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
    invoices: invoiceListPieChartSelector(state),
    customers: customersSelector(state),
    productTypes: productTypesSelector(state)
});

const mapDispatchToProps = dispatch => ({
    fetchCustomers: () => dispatch(ACTIONS_SEARCH.fetchCustomers()),
    fetchProductTypes: () => dispatch(ACTIONS_SEARCH.fetchProductTypes()),
    resetInvoices: () => dispatch(ACTIONS.resetInvoices()),
    fetchInvoices: criteria => dispatch(ACTIONS.fetchCustomerInvoices(criteria))
});

CustomerSearchPage.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        role: PropTypes.string
    }).isRequired,
    fetchCustomers: PropTypes.func.isRequired,
    fetchProductTypes: PropTypes.func.isRequired,
    resetInvoices: PropTypes.func.isRequired,
    fetchInvoices: PropTypes.func.isRequired,
    invoices: PropTypes.shape({
        invoices: PropTypes.arrayOf(PropTypes.object).isRequired,
        isBusy: PropTypes.bool.isRequired,
        isEnd: PropTypes.bool.isRequired
    }).isRequired,
    customers: PropTypes.arrayOf(PropTypes.object).isRequired,
    productTypes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerSearchPage));
