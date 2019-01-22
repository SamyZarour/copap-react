import axios from 'axios';
import { getToken } from '../utils';
import config from '../config';

export const login = user => axios.post(`${config.url}/api/users/login`, user);

export const register = user => axios.post(`${config.url}/api/users/`, user);

export const getCurrentUser = () => axios.get(`${config.url}/api/users/current-user`, { headers: { authorization: `Bearer ${getToken()}` } });
