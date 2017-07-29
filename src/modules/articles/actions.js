import request from '../../lib/request';
import { ARTICLES_QUERY, ARTICLE_QUERY } from '../../lib/queries';
import {
  REQUEST_ARTICLES,
  ARTICLES_SUCCESS,
  ARTICLES_FAILURE,
  FETCH_ARTICLE_SUCCESS } from './actionTypes';

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

export function fetchArticle(id) {
  const variables = `{
    "id": "${id}"
  }`;
  return function action(dispatch) {
    dispatch(articlesRequest());
    request(ARTICLE_QUERY, variables).then(response => {
      dispatch(fetchArticleSuccess(response.data.articles[0]));
    }).catch(error => {
      dispatch(articlesFailure(error));
    });
  };
}

function fetchArticleSuccess(article) {
  return {
    type: FETCH_ARTICLE_SUCCESS,
    article,
  };
}
