import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import ButtonSignOut from '../ButtonSignOut';
import { getToken } from '../../utils';
import './Navbar.scss';

const Navbar = ({ username }) => (
    <div className="Navbar">
        <nav className="navbar navbar-expand-lg navbar-light">
            <Logo />
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/brand">Supplier</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/customer">Customer</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/report">Report</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/sales">Sales</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/contacts">Contacts</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        { getToken() && username && <span className="navUsername"> {username} </span> }
                        { getToken() && <ButtonSignOut /> }
                    </li>
                </ul>
            </div>
        </nav>
    </div>
);

Navbar.propTypes = {
    username: PropTypes.string
};

Navbar.defaultProps = {
    username: null
};

export default Navbar;
