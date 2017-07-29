import * as actionTypes from './actionTypes';

export * from './actions';

const defaultState = {
  fetching: false,
  list: [],
  error: '',
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_ARTICLES:
      return { ...state, fetching: true };
    case actionTypes.ARTICLES_SUCCESS:
      return { ...state, fetching: false, list: articlesList(state.list, action) };
    case actionTypes.FETCH_ARTICLE_SUCCESS:
      return { ...state, fetching: false, list: articlesList(state.list, action) };
    case actionTypes.ARTICLES_FAILURE:
      return { ...state, fetching: false, error: action.error };
    default:
      return state;
  }
}

function articlesList(state = [], action) {
  const newList = [...state];
  let sameArt;
  switch (action.type) {
    case actionTypes.ARTICLES_SUCCESS:
      action.articles.forEach(a => {
        sameArt = newList.find(arti => arti.id === a.id);
        if (!sameArt) {
          newList.push(a);
        }
      });
      return newList;
    case actionTypes.FETCH_ARTICLE_SUCCESS:
      if (!newList.find(a => a.id === action.article.id)) {
        newList.push(action.article);
      }
      return newList;
    default:
      return state;
  }
}
