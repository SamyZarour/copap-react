import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import common from './common';
import auth from './auth';
import modal from './modal';
import invoices from './invoices';


export default combineReducers({
    router: routerReducer,
    form: formReducer,
    common,
    auth,
    modal,
    invoices
});
