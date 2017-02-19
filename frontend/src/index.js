import React from 'react';
import ReactDOM from 'react-dom';
import URLSearchParams from 'url-search-params';

import { Provider } from 'react-redux';
import { createDevTools } from 'redux-devtools';
import { compose, createStore, applyMiddleware } from 'redux';
import { responsiveStoreEnhancer } from 'redux-responsive';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import thunk from 'redux-thunk';

import apiRequestMiddleware from './common/utils/apiRequestMiddleware';
import reducers from './reducers';
import routes from './routes';
import './index.css';

// Polyfill URLSearchParams so fetch-client works in IE
window.URLSearchParams = URLSearchParams;

// Apply Redux middleware
let storeEnhancer = compose(
  responsiveStoreEnhancer,
  applyMiddleware(
    apiRequestMiddleware,
    thunk
  )
);

// Apply Redux DevTools in development only
let DevTools = null;

if (process.env.NODE_ENV === 'development') {
  DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" defaultIsVisible={false}>
      <LogMonitor theme="tomorrow" />
    </DockMonitor>
  );

  storeEnhancer = compose(storeEnhancer, DevTools.instrument());
}

// Bootstrap the React app
ReactDOM.render(
  (
    <Provider store={storeEnhancer(createStore)(reducers)}>
      <div>
        {DevTools ? <DevTools /> : null}
        {routes}
      </div>
    </Provider>
  ),
  document.getElementById('root')
);
