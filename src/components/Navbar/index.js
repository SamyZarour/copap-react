import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../Logo';
import ButtonSignOut from '../ButtonSignOut';
import { getToken, checkNested } from '../../utils';
import './Navbar.scss';

const Navbar = props => (
    <div className="Navbar">

        <div className="nav-item">
            <div className="nav-left">
                <Logo />
            </div>
        </div>

        <div className="nav-item">
            <div className="nav-right">
                { getToken() && checkNested(props, 'username') && <span className="navUsername"> {props.username} </span> }
                { getToken() && <ButtonSignOut /> }
            </div>
        </div>

    </div>
);

Navbar.propTypes = {
    username: PropTypes.string
};

Navbar.defaultProps = {
    username: null
};

export default Navbar;
