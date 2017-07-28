import * as actionTypes from './actionTypes';

export * from './actions';

const defaultState = {
  fetching: false,
  list: [],
  error: null,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_ARTICLES:
      return { ...state, fetching: true };
    case actionTypes.ARTICLES_SUCCESS:
      return { ...state, fetching: false, list: action.articles };
    case actionTypes.ARTICLES_FAILURE:
      return { ...state, fetching: false, error: action.error };
    default:
      return state;
  }
}
