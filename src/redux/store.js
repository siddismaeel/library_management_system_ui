// import compose to add multiple enhancers in store
import { createStore, applyMiddleware, compose } from 'redux';
//Redux Thunk middleware allows you to write action creators that return a function instead of an action
import {thunk }from 'redux-thunk';

import rootReducer from './reducers';

//initial state should be null not undefined
const initialState = {};

const middleware = [thunk];

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//composing enhancers to
const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
  // other enhancers if any
);
const store = createStore(rootReducer, initialState, enhancer);
export default store;