import { combineReducers } from 'redux';
import { createResponsiveStateReducer } from 'redux-responsive';

import styleGuide from './style-guide/reducers';

export default combineReducers({
  browser: createResponsiveStateReducer(),
  styleGuide,
});
