import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { history } from './history';
import reducer from './reducers';
import sagas from './sagas';

// Build the middleware for intercepting and dispatching navigation actions
const routerSagaMiddleware = routerMiddleware(history);

const initialState = {};
const sagaMiddleware = createSagaMiddleWare();

const middlewares = [
    sagaMiddleware,
    routerSagaMiddleware
];

const enhancers = [
    applyMiddleware(...middlewares)
];

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancers(...enhancers)
);
sagaMiddleware.run(sagas);

export default store;
