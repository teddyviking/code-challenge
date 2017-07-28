import request from '../../request';
import { ARTICLES_QUERY } from '../../queries';
import {
  REQUEST_ARTICLES,
  ARTICLES_SUCCESS,
  ARTICLES_FAILURE } from './actionTypes';

export function getArticles() {
  return function action(dispatch) {
    dispatch(articlesRequest());
    request(ARTICLES_QUERY).then(response => {
      dispatch(articlesSuccess(response.data.articles));
    }).catch(error => {
      dispatch(articlesFailure(error));
    });
  };
}

function articlesRequest() {
  return {
    type: REQUEST_ARTICLES,
  };
}

function articlesSuccess(articles) {
  return {
    type: ARTICLES_SUCCESS,
    articles,
  };
}

function articlesFailure(error) {
  return {
    type: ARTICLES_FAILURE,
    error,
  };
}
