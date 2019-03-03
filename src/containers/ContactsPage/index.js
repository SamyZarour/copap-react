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
    }

    render() {
        const { customerInfo, customers, fetchCustomerInfo } = this.props;
        return (
            <div className="ContactsPage">
                {
                    customerInfo ?
                        (customerInfo && <Contact {...customerInfo} />) :
                        <SelectCustomerForm onSubmit={fetchCustomerInfo} customers={customers} />
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
    fetchCustomerInfo: ({ customer }) => dispatch(ACTIONS.fetchCustomerInfo(customer))
});

ContactsPage.propTypes = {
    initSearch: PropTypes.func.isRequired,
    resetCustomerInfo: PropTypes.func.isRequired,
    fetchCustomerInfo: PropTypes.func.isRequired,
    customers: PropTypes.arrayOf(PropTypes.object).isRequired,
    customerInfo: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactsPage));
