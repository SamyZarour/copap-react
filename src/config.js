// Load env variables from .env
require('dotenv').config();

// Get Current Env
const env = process.env.NODE_ENV;

// Dev Configs
const development = {
    url: process.env.REACT_APP_DEV_DB_URL || 'http://localhost:3000'
};

// Test Configs
const test = {
    url: process.env.REACT_APP_TEST_DB_URL || 'http://localhost:3000'
};

// Prod Configs
const production = {
    url: process.env.URL
};

// Core configs
const config = {
    development,
    test,
    production
};

// Return env specific configs
export default config[env];
