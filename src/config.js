// Load env variables from .env
require('dotenv').config();

// Get Current Env
const env = process.env.NODE_ENV;

// Dev Configs
const development = {
    url: process.env.REACT_APP_DEV_DB_URL || 'http://localhost:3000',
    url_sql: 'http://copap.localtunnel.me'
};

// Test Configs
const test = {
    url: process.env.REACT_APP_TEST_DB_URL || 'http://localhost:3000',
    url_sql: 'http://copap.localtunnel.me'
};

// Prod Configs
const production = {
    url: process.env.URL,
    url_sql: 'http://copap.localtunnel.me'
};

// Core configs
const config = {
    development,
    test,
    production
};

// Return env specific configs
export default config[env];
