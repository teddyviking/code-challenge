import * as actionTypes from './actionTypes';

export * from './actions';

const defaultState = {};

export default function(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.FORM_CHANGE:
      return Object.assign({}, state, action.change);
    case actionTypes.EMPTY_FORM:
      return {};
    default:
      return state;
  }
}
