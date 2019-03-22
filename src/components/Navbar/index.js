import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import ButtonSignOut from '../ButtonSignOut';
import { getToken, checkNested } from '../../utils';
import './Navbar.scss';

const Navbar = props => (
    <div className="Navbar">

        <div className="nav-item">
            <div className="nav-left">
                <Logo />
                <div className="nav-element">
                    <Link className="nav-link" to="/brand">Supplier</Link>
                </div>
                <div className="nav-element">
                    <Link className="nav-link" to="/customer">Customer</Link>
                </div>
                <div className="nav-element">
                    <Link className="nav-link" to="/report">Report</Link>
                </div>
                <div className="nav-element">
                    <Link className="nav-link" to="/sales">Sales</Link>
                </div>
                <div className="nav-element">
                    <Link className="nav-link" to="/contacts">Contacts</Link>
                </div>
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
