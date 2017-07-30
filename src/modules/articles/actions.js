import request from '../../lib/request';
import { ARTICLES_QUERY, ARTICLE_QUERY, CREATE_ARTICLE_QUERY } from '../../lib/queries';
import actionTypes from './actionTypes';

export function fetchArticle(id) {
  const variables = `{
    "id": "${id}"
  }`;
  return function action(dispatch) {
    dispatch(articlesRequest());
    return request(ARTICLE_QUERY, variables).then(response => {
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
  const variables = `{
    "author": "${article.author}",
    "content": "${article.content}",
    "published": "${article.published}",
    "tags": "${article.tags}",
    "title": "${article.title}"
  }`;
  return function action(dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(articlesRequest());
      return request(CREATE_ARTICLE_QUERY, variables).then(response => {
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
  const variables = `{
    "id": "${id}"
    "changes": "${changes}"
  }`;
  return function action(dispatch) {
    dispatch(articlesRequest());
    return request(ARTICLE_QUERY, variables).then(response => {
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
  const variables = `{
    "id": "${id}"
  }`;
  return function action(dispatch) {
    dispatch(articlesRequest());
    return request(ARTICLE_QUERY, variables).then(response => {
      dispatch(articlesSuccess());
      dispatch(removeArticle(response.data.articles[0].id));
    }).catch(error => {
      dispatch(articlesFailure(error));
    });
  };
}

function removeArticle(articleId) {
  return {
    type: actionTypes.REMOVE_ARTICLE,
    articleId,
  };
}
