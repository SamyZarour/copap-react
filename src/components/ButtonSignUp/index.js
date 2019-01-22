import React from 'react';
import { Link } from 'react-router-dom';

import Clickable from '../Clickable';

const ButtonSignUp = () => (
    <Link to="/register">
        <Clickable>
            Register
        </Clickable>
    </Link>
);

export default ButtonSignUp;
