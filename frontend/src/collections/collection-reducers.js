import { combineReducers } from 'redux';
import getApiReducer from '../common/utils/getApiReducer';
import { FETCH_COLLECTION_LIST } from './collection-actions';

const reducers = combineReducers({
  list: getApiReducer(FETCH_COLLECTION_LIST, []),
});

export default reducers;
