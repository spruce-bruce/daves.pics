import { combineReducers } from 'redux';
import getApiReducer from '../common/utils/getApiReducer';
import { FETCH_COLLECTION_LIST } from './collection-actions';
import Immutable from 'immutable';

const collectionListReducer = (state = Immutable.Map(), action) => {
  if (action.originalType === FETCH_COLLECTION_LIST) {
    state = state.set(action.sourceId, getApiReducer(FETCH_COLLECTION_LIST, [])(state, action));
  }

  return state;
}

const reducers = combineReducers({
  collectionList: collectionListReducer,
});

export default reducers;
