import request from '../../lib/request';
import {
  ARTICLES_QUERY,
  ARTICLE_QUERY,
  CREATE_ARTICLE_QUERY,
  REMOVE_ARTICLE_QUERY } from '../../lib/queries';
import actionTypes from './actionTypes';

export function fetchArticle(id) {
  return function action(dispatch) {
    dispatch(articlesRequest());
    return request(ARTICLE_QUERY, { id }).then(response => {
      dispatch(articlesSuccess());
      dispatch(addArticle(response.data.articles[0]));
    }).catch(error => {
      dispatch(articlesFailure(error));
    });
  };
}

export function fetchArticles() {
  return function action(dispatch) {
    dispatch(articlesRequest());
    return request(ARTICLES_QUERY).then(response => {
      dispatch(articlesSuccess());
      dispatch(addArticles(response.data.articles));
    }).catch(error => {
      dispatch(articlesFailure(error));
    });
  };
}

export function createArticle(article) {
  return function action(dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(articlesRequest());
      return request(CREATE_ARTICLE_QUERY, article).then(response => {
        const newArticle = response.data.addArticle;
        dispatch(articlesSuccess());
        dispatch(addArticle(newArticle));
        return resolve(newArticle);
      }).catch(error => {
        dispatch(articlesFailure(error));
        return reject(error);
      });
    });
  };
}

function articlesRequest() {
  return {
    type: actionTypes.REQUEST_ARTICLES,
  };
}

function articlesSuccess(articles) {
  return {
    type: actionTypes.ARTICLES_SUCCESS,
    articles,
  };
}

function articlesFailure(error) {
  return {
    type: actionTypes.ARTICLES_FAILURE,
    error,
  };
}

function addArticle(article) {
  return {
    type: actionTypes.ADD_ARTICLE,
    article,
  };
}

function addArticles(articles) {
  return {
    type: actionTypes.ADD_ARTICLES,
    articles,
  };
}

export function editArticle(id, changes) {
  return function action(dispatch) {
    dispatch(articlesRequest());
    return request(ARTICLE_QUERY, { id, ...changes }).then(response => {
      dispatch(articlesSuccess());
      dispatch(updateArticle(response.data.articles[0]));
    }).catch(error => {
      dispatch(articlesFailure(error));
    });
  };
}

function updateArticle(article) {
  return {
    type: actionTypes.UPDATE_ARTICLE,
    article,
  };
}

export function deleteArticle(id) {
  return function action(dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(articlesRequest());
      return request(REMOVE_ARTICLE_QUERY, { id }).then(response => {
        const deletedId = response.data.removeArticle.id;
				console.log(deletedId);
        dispatch(articlesSuccess());
        dispatch(removeArticle(deletedId));
        return resolve(deletedId);
      }).catch(error => {
        dispatch(articlesFailure(error));
        return reject(error);
      });
    });
  };
}

function removeArticle(articleId) {
  return {
    type: actionTypes.REMOVE_ARTICLE,
    articleId,
  };
}
