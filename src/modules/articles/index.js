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
      return { ...state, fetching: false };
    case actionTypes.ARTICLES_FAILURE:
      return { ...state, fetching: false, error: action.error };

    case actionTypes.ADD_ARTICLE:
      return { ...state, list: articlesList(state.list, action) };
    case actionTypes.UPDATE_ARTICLE:
      return { ...state, list: articlesList(state.list, action) };
    case actionTypes.ADD_ARTICLES:
      return { ...state, list: articlesList(state.list, action) };
    case actionTypes.REMOVE_ARTICLE:
      return { ...state, list: articlesList(state.list, action) };
    default:
      return state;
  }
}

function articlesList(state = [], action) {
  const newList = [...state];
  switch (action.type) {
    case actionTypes.ADD_ARTICLE:
      if (!articleInArray(newList, action.article)) newList.push(action.article);
      return newList;
    case actionTypes.ADD_ARTICLES:
      return [...state, ...filterPreviousArticles(state, action.articles)];
    case actionTypes.UPDATE_ARTICLE:
      return state.map(article => {
        return article.id === action.article.id ? articleReducer(article, action) : article;
      });
    case actionTypes.REMOVE_ARTICLE:
      return state.filter(article => article.id !== action.articleId);
    default:
      return state;
  }
}

function articleReducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.UPDATE_ARTICLE:
      return { ...state, ...action.article };
    default:
      return state;
  }
}
