import { combineReducers } from 'redux';
import getApiReducer from '../common/utils/getApiReducer';
import { FETCH_SOURCE_LIST } from './source-actions';

const reducers = combineReducers({
  list: getApiReducer(FETCH_SOURCE_LIST, []),
});

export default reducers;
