import React, { Component } from 'react';
import './style.scss';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { customersSelector, customerInfoSelector } from '../../selectors/search';
import * as ACTIONS from '../../actions/search';
import SelectCustomerForm from '../../forms/SelectCustomerForm';
import Contact from '../../components/Contact';

class ContactsPage extends Component {
    componentWillMount() {
        this.props.resetCustomerInfo();
        this.props.initSearch({ customers: true });
        this.state = {};
        this.setCustomer = this.setCustomer.bind(this);
    }

    setCustomer(customer) {
        this.setState({ customer });
        if (customer) this.props.fetchCustomerInfo(customer);
        else this.props.resetCustomerInfo();
    }

    render() {
        const { customerInfo, customers } = this.props;
        return (
            <div className="ContactsPage">
                {
                    customerInfo ?
                        (this.state.customer && (
                            <div>
                                <h1>{customers.length > 0 && customers.find(c => c.value === this.state.customer).label}</h1>
                                <button type="button" className="cancelButton" onClick={() => this.setCustomer(null)}>Change Customer</button>
                                <Contact {...customerInfo} />
                            </div>
                        )) :
                        <SelectCustomerForm onSubmit={({ customer }) => this.setCustomer(customer)} customers={customers} />
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    customers: customersSelector(state),
    customerInfo: customerInfoSelector(state)

});

const mapDispatchToProps = dispatch => ({
    initSearch: fields => dispatch(ACTIONS.initSearch(fields)),
    resetCustomerInfo: () => dispatch(ACTIONS.resetCustomerInfo()),
    fetchCustomerInfo: customer => dispatch(ACTIONS.fetchCustomerInfo(customer))
});

ContactsPage.propTypes = {
    initSearch: PropTypes.func.isRequired,
    resetCustomerInfo: PropTypes.func.isRequired,
    fetchCustomerInfo: PropTypes.func.isRequired,
    customers: PropTypes.arrayOf(PropTypes.object).isRequired,
    customerInfo: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactsPage));
