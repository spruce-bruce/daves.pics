import React from 'react';
import { applyRouterMiddleware, browserHistory, Route, Router } from 'react-router';
import { useScroll } from 'react-router-scroll';

import StyleGuidePage from './style-guide/StyleGuidePage';

export default (
  <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
    <Route path="/" component={StyleGuidePage}/>
  </Router>
);
