import React from 'react';
import { applyRouterMiddleware, browserHistory, Route, Router, IndexRoute } from 'react-router';
import { useScroll } from 'react-router-scroll';

import Layout from './navigation/Layout';
import ImageList from './images/ImageList';
import StyleGuidePage from './style-guide/StyleGuidePage';

export default (
  <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
    <Route path="/" component={Layout}>
      <IndexRoute component={ImageList} />
      <Route path="style-guide" component={StyleGuidePage} />
    </Route>
  </Router>
);
