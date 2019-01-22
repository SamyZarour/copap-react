import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import common from './common';
import auth from './auth';
import modal from './modal';


export default combineReducers({
    router: routerReducer,
    form: formReducer,
    common,
    auth,
    modal
});
