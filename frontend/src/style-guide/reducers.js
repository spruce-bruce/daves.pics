import { combineReducers } from 'redux';
import { TOGGLE_STYLE_GUIDE_MODAL } from './actions';

const modalVisible = (state = false, action) => (action.type === TOGGLE_STYLE_GUIDE_MODAL) ? !state : state;

export default combineReducers({
  modalVisible,
});
