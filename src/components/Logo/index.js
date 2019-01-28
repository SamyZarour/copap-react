import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.scss';


const Logo = () => (
    <div className="Logo">
        <Link to="/"><img src="/icons/logo_copap.gif" alt="Copap Inc" /></Link>
    </div>
);

export default Logo;
