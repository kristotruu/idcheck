import {applyMiddleware, createStore, compose} from "redux";
import logger  from 'redux-logger';
import thunk from 'redux-thunk';
import CombinedReducers from './index';

let middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware=[...middleware, logger];
}

export const store = createStore(CombinedReducers(), compose(applyMiddleware(...middleware)));