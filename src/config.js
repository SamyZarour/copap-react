// Load env variables from .env
require('dotenv').config();

// Get Current Env
const env = process.env.NODE_ENV;

// Dev Configs
const development = {
    url: process.env.REACT_APP_DEV_DB_URL || 'http://localhost:3000',
    url_sql: process.env.REACT_APP_SQL_URL || 'https://32d930a4.ngrok.io'
};

// Test Configs
const test = {
    url: process.env.REACT_APP_TEST_DB_URL || 'http://localhost:3000',
    url_sql: process.env.REACT_APP_SQL_URL || 'https://32d930a4.ngrok.io'
};

// Prod Configs
const production = {
    url: process.env.REACT_APP_API_URL,
    url_sql: process.env.REACT_APP_SQL_URL
};

// Core configs
const config = {
    development,
    test,
    production
};

// Return env specific configs
export default config[env];
