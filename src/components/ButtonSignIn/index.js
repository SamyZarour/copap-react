import React from 'react';
import { Link } from 'react-router-dom';
import Clickable from '../Clickable';

const ButtonSignIn = () => (
    <Link to="/login">
        <Clickable>
            Sign In
        </Clickable>
    </Link>
);

export default ButtonSignIn;
