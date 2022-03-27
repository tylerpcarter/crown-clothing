import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'; //see what state looks like before state dispatch, what the action is, and what the state looks like after an action

import { rootReducer } from './root-reducer';

// root-reducer: combination of all reducers. 

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers); //3 arguments. 1: root reducer is needed to create the store. 2: optional extra default states, 3: middlewares

