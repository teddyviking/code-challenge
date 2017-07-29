import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import Home from '../components/Home';
import Show from '../components/Article/Show';

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path=":id" component={Show} />
  </Route>
);
