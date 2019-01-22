import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.scss';


const Logo = () => (
    <div className="Logo">
        <Link to="/">Authentication App</Link>
    </div>
);

export default Logo;
