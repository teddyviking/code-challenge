import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import thunk from 'redux-thunk';
import reducer from './index';
import actionTypes from './actionTypes';
import { fetchArticle, getArticles } from './actions';

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

  it('Get a single article', () => {
    const action = {
      type: actionTypes.FETCH_ARTICLE_SUCCESS,
      article: fakeArticle,
    };
    const newState = reducer(defaultState, action);
    expect(newState).not.toBe(defaultState);
    expect(newState.list).toHaveLength(1);
    expect(newState.list[0]).toEqual(fakeArticle);
  });

  it('Get all articles', () => {
    const action = {
      type: actionTypes.ARTICLES_SUCCESS,
      articles: [fakeArticle, fakeArticle2],
    };
    const newState = reducer(defaultState, action);
    expect(newState.list).toHaveLength(2);
    expect(newState.list[1]).toEqual(fakeArticle2);
    expect(newState).not.toBe(defaultState);
  });
});

describe('Article actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates FETCH_ARTICLE_SUCCESS when fetching an article has been done', () => {
    nock('http://localhost:4000')
      .post('/graphql')
      .reply(200, { data: { articles: [fakeArticle] } });

    const expectedActions = [
      { type: actionTypes.REQUEST_ARTICLES },
      { type: actionTypes.FETCH_ARTICLE_SUCCESS, article: fakeArticle },
    ];
    const store = mockStore({ articles: [] });
    return store.dispatch(fetchArticle()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ARTICLE_SUCCESS when fetching all articles has been done', () => {
    nock('http://localhost:4000')
      .post('/graphql')
      .reply(200, { data: { articles: [fakeArticle, fakeArticle2] } });

    const expectedActions = [
      { type: actionTypes.REQUEST_ARTICLES },
      { type: actionTypes.ARTICLES_SUCCESS, articles: [fakeArticle, fakeArticle2] },
    ];
    const store = mockStore({ articles: [] });
    return store.dispatch(getArticles()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
