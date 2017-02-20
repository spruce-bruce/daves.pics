import { combineReducers } from 'redux';
import { createResponsiveStateReducer } from 'redux-responsive';

import styleGuide from './style-guide/reducers';
import sourceReducers from './sources/source-reducers';
import imageReducers from './images/image-reducers';

export default combineReducers({
  browser: createResponsiveStateReducer(),
  styleGuide,

  sources: sourceReducers,
  images: imageReducers,
});
