import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import './style.scss';

class List extends Component {
    constructor(props) {
        super(props);
        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll() {
        const { isEnd } = this.props;
        if (!isEnd && (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) && this.props.list.length) {
            this.props.onPaginatedSearch();
        }
    }

    render() {
        const { isBusy, isEnd, list, ListItem } = this.props;
        return (
            <div className="list">
                {
                    (() => {
                        if (!isBusy && list.length === 0) { return <div>No Items</div>; }
                        return list.map(item => <ListItem {...item} key={item.id} />);
                    })()
                }
                { isBusy && <Spinner /> }
                { isEnd && <div className="noMoreItems">No more Items</div>}
            </div>
        );
    }
}

List.propTypes = {
    isBusy: PropTypes.bool.isRequired,
    isEnd: PropTypes.bool.isRequired,
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    ListItem: PropTypes.func.isRequired,
    onPaginatedSearch: PropTypes.func.isRequired
};

export default List;
