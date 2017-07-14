import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import * as reducers from '../reducers/reducers';


const composedReducer = combineReducers({ ...reducers });

export const store = createStore(
  composedReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);