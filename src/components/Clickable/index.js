import React from 'react';
import PropTypes from 'prop-types';
import './Clickable.scss';

const Clickable = props => (
    <button className="Clickable" type="button" onClick={props.onClick}>
        {props.children}
    </button>
);

Clickable.propTypes = {
    children: PropTypes.any.isRequired,
    onClick: PropTypes.func
};

export default Clickable;
