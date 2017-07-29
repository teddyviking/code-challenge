import * as actionTypes from './actionTypes';
import {
  filterPreviousArticles,
  articleInArray } from './helpers';

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
  switch (action.type) {
    case actionTypes.ARTICLES_SUCCESS:
      return [...state, ...filterPreviousArticles(state, action.articles)];
    case actionTypes.FETCH_ARTICLE_SUCCESS:
      if (!articleInArray(newList, action.article)) {
        newList.push(action.article);
      }
      return newList;
    default:
      return state;
  }
}
