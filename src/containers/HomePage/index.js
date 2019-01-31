import React, { Component } from 'react';
import './HomePage.scss';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userSelector } from '../../selectors/auth';
import { invoicesSelector } from '../../selectors/invoices';
import List from '../../components/List';
import Invoice from '../../components/Invoice';
import * as ACTIONS from '../../actions/invoices';
import SearchForm from '../../components/SearchForm';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.setSearchCriteria = this.setSearchCriteria.bind(this);
        this.getNextPage = this.getNextPage.bind(this);
        this.state = { page: 0 };
    }

    componentWillMount() {
        this.props.resetInvoices();
    }

    setSearchCriteria(criteria) {
        this.props.resetInvoices();
        const newState = { page: 0, ...criteria };
        this.setState(newState);
        this.props.fetchInvoices(newState);
    }

    getNextPage() {
        const newState = { ...this.state, page: this.state.page + 1 };
        this.setState(newState);
        this.props.fetchInvoices(newState);
    }

    render() {
        const { invoices: { invoices, isBusy, isEnd } } = this.props;
        return (
            <div className="HomePage">
                <SearchForm onSubmit={this.setSearchCriteria} />
                <List isEnd={isEnd} isBusy={isBusy} list={invoices} ListItem={Invoice} onPaginatedSearch={this.getNextPage} />
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
    fetchInvoices: criteria => dispatch(ACTIONS.fetchInvoices(criteria))
});

HomePage.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired
    }).isRequired,
    resetInvoices: PropTypes.func.isRequired,
    fetchInvoices: PropTypes.func.isRequired,
    invoices: PropTypes.shape({
        invoices: PropTypes.arrayOf(PropTypes.object).isRequired,
        isBusy: PropTypes.bool.isRequired,
        isEnd: PropTypes.bool.isRequired
    }).isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
