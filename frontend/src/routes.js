import React from 'react';
import { applyRouterMiddleware, browserHistory, Route, Router, IndexRoute } from 'react-router';
import { useScroll } from 'react-router-scroll';

import Layout from './navigation/Layout';
import NewestImages from './images/NewestImages';
import SourceImages from './sources/SourceImages';
import StyleGuidePage from './style-guide/StyleGuidePage';

export default (
  <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
    <Route path="/" component={Layout}>
      <IndexRoute component={NewestImages} />
      <Route path="source/:sourceId(/**)" component={SourceImages} />

      <Route path="style-guide" component={StyleGuidePage} />
    </Route>
  </Router>
);
