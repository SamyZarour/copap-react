import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.scss';

const LandingPage = () => (
    <div className="LandingPage">
        Welcome to Auth App please <Link to="/login">Login</Link> or <Link to="/register">Register</Link>!
    </div>
);

export default LandingPage;
