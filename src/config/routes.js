import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import Home from '../components/Home';
import Show from '../components/Article/Show';
import New from '../components/Article/New';

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/new" component={New} />
    <Route path=":id" component={Show} />
  </Route>
);
