import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.scss';

const Card = props => (
    <div className="Card" data-cy="exist-category">
        <Link to={props.link}>
            <div className="categoryName">
                {props.title}
            </div>
        </Link>
    </div>
);

Card.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
};

export default Card;
