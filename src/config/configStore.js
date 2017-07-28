import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../modules/reducers';

const appReducer = combineReducers({
  ...reducers,
});

export default function configureStore() {
  return createStore(appReducer, compose(applyMiddleware(thunk), configureDevTools()));
}

function configureDevTools() {
  return window.devToolsExtension ? window.devToolsExtension() : f => f;
}
