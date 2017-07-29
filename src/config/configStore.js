import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import reducers from '../modules/reducers';

const router = routerMiddleware(browserHistory);
const appReducer = combineReducers({
  ...reducers,
  routing: routerReducer,
});

export default function configureStore() {
  return createStore(appReducer, compose(applyMiddleware(thunk, router), configureDevTools()));
}

function configureDevTools() {
  return window.devToolsExtension ? window.devToolsExtension() : f => f;
}
