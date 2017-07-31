import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import thunk from 'redux-thunk';
import reducer from './index';
import actionTypes from './actionTypes';
import {
  fetchArticle,
  fetchArticles,
  editArticle,
  deleteArticle } from './actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const defaultState = {
  fetching: false,
  list: [],
  error: '',
};
const fakeArticle = {
  author: 'Bryce Lueilwitz',
  content: 'Unde qui voluptas velit perferendis harum quibusdam isrVitae odit magnam saepe beatae. Quos accusantium odi',
  excerpt: 'Unde qui voluptas velit perf',
  published: true,
  title: 'Product Identity Executive',
  id: '597c88ff7a9e83d714c53d7a',
  tags: ['Vermont withdrawal', 'Producer Savings Account Berkshire'],
};

const fakeArticle2 = {
  author: 'Brielle Braun IV',
  content: 'Unde qui voluptas velit perferendis harum quibusdam isrVitae odit magnam saepe beatae. Quos accusantium odi',
  excerpt: 'Unde qui voluptas velit perf',
  published: false,
  title: 'National Interactions Coordinator',
  id: '597c88ff7a9e83d714c53d79',
  tags: ['Ethiopian Birr Path withdrawal', 'index SCSI'],
};

describe('Articles reducer', () => {
  it('should return the initial state', () => {
    const newState = reducer(undefined, {});
    expect(newState).toEqual({
      fetching: false,
      list: [],
      error: '',
    });
  });

  it('Adds a single article', () => {
    const action = {
      type: actionTypes.ADD_ARTICLE,
      article: fakeArticle,
    };
    const newState = reducer(defaultState, action);
    expect(newState).not.toBe(defaultState);
    expect(newState.list).toHaveLength(1);
    expect(newState.list[0]).toEqual(fakeArticle);
  });

  it('Adds multiple articles', () => {
    const action = {
      type: actionTypes.ADD_ARTICLES,
      articles: [fakeArticle, fakeArticle2],
    };
    const newState = reducer(defaultState, action);
    expect(newState.list).toHaveLength(2);
    expect(newState.list[1]).toEqual(fakeArticle2);
    expect(newState).not.toBe(defaultState);
  });

  it('Does not add already listed articles', () => {
    const action = {
      type: actionTypes.ADD_ARTICLE,
      article: fakeArticle,
    };
    const baseState = Object.assign({}, defaultState, { list: [fakeArticle] });
    const newState = reducer(baseState, action);
    expect(newState).not.toBe(defaultState);
    expect(newState.list).toHaveLength(1);
  });

  it('Updates an article', () => {
    const action = {
      type: actionTypes.UPDATE_ARTICLE,
      article: Object.assign({}, fakeArticle, { title: 'New title' }),
    };
    const baseState = Object.assign({}, defaultState, { list: [fakeArticle] });
    const newState = reducer(baseState, action);
    expect(newState).not.toBe(baseState);
    expect(newState.list).toHaveLength(1);
    expect(newState.list[0].id).toBe(fakeArticle.id);
    expect(newState.list[0].title).not.toEqual(fakeArticle.title);
  });

  it('Deletes an article', () => {
    const action = {
      type: actionTypes.REMOVE_ARTICLE,
      articleId: fakeArticle.id,
    };
    const baseState = Object.assign({}, defaultState, { list: [fakeArticle] });
    const newState = reducer(baseState, action);
    expect(newState).not.toBe(baseState);
    expect(newState.list).toHaveLength(0);
    expect(newState.list).not.toContainEqual(fakeArticle);
  });
});

describe('Article actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates ADD_ARTICLE when fetching an article has been done', () => {
    nock('http://localhost:4000')
      .post('/graphql')
      .reply(200, { data: { articles: [fakeArticle] } });

    const expectedActions = [
      { type: actionTypes.REQUEST_ARTICLES },
      { type: actionTypes.ARTICLES_SUCCESS },
      { type: actionTypes.ADD_ARTICLE, article: fakeArticle },
    ];
    const store = mockStore({ articles: [] });
    return store.dispatch(fetchArticle()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ADD_ARTICLES when fetching all articles has been done', () => {
    nock('http://localhost:4000')
      .post('/graphql')
      .reply(200, { data: { articles: [fakeArticle, fakeArticle2] } });

    const expectedActions = [
      { type: actionTypes.REQUEST_ARTICLES },
      { type: actionTypes.ARTICLES_SUCCESS },
      { type: actionTypes.ADD_ARTICLES, articles: [fakeArticle, fakeArticle2] },
    ];
    const store = mockStore({ articles: [] });
    return store.dispatch(fetchArticles()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates UPDATE_ARTICLE when editing an article has been done', () => {
    nock('http://localhost:4000')
      .post('/graphql')
      .reply(200, { data: { editArticle: fakeArticle } });

    const expectedActions = [
      { type: actionTypes.REQUEST_ARTICLES },
      { type: actionTypes.ARTICLES_SUCCESS },
      { type: actionTypes.UPDATE_ARTICLE, article: fakeArticle },
    ];
    const store = mockStore({ articles: [fakeArticle] });
    return store.dispatch(editArticle(fakeArticle.id, { title: 'new title' })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates REMOVE_ARTICLE when deleting an article has been done', () => {
    nock('http://localhost:4000')
      .post('/graphql')
      .reply(200, { data: { removeArticle: { id: fakeArticle.id } } });

    const expectedActions = [
      { type: actionTypes.REQUEST_ARTICLES },
      { type: actionTypes.ARTICLES_SUCCESS },
      { type: actionTypes.REMOVE_ARTICLE, articleId: fakeArticle.id },
    ];
    const store = mockStore({ articles: [fakeArticle] });
    return store.dispatch(deleteArticle()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
