import { combineReducers } from 'redux';
import getApiReducer from '../common/utils/getApiReducer';
import { FETCH_IMAGE_LIST } from './image-actions';

const reducers = combineReducers({
  list: getApiReducer(FETCH_IMAGE_LIST, { collection: [], pagination: {} }),
});

export default reducers;
