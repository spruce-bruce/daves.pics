import Immutable from 'immutable';
import config from '../../config';

export const defaultState = Immutable.Map({
  loaded: false,
  loading: false,
  data: null,
  error: false,
  validationErrors: Immutable.Map(),
});

function formatValidationErrors(error) {
  const errors = {};

  if (!error.validationErrors) {
    return Immutable.fromJS(errors);
  }

  const validationMessages = config.validationMessages || {};

  error.validationErrors.forEach((validationError) => {
    if (!errors[validationError.key]) {
      errors[validationError.key] = [];
    }
    errors[validationError.key].push(
      validationMessages[validationError.type] || validationError.message
    );
  });

  return Immutable.fromJS(errors);
}

export default (actionTypePrefix, dataDefault) => {
  let newDefault = defaultState;
  newDefault = !dataDefault ? newDefault : newDefault.set('data', Immutable.fromJS(dataDefault));

  return function (state = newDefault, action) {
    switch (action.type) {
      case `${actionTypePrefix}_REQUEST`:
        return state.merge({
          loading: true,
          loaded: false,
          validationErrors: Immutable.Map(),
        });
      case `${actionTypePrefix}_SUCCESS`:
        return state.merge({
          loading: false,
          loaded: true,
          data: Immutable.fromJS(action.json),
          validationErrors: Immutable.Map(),
          error: false,
        });
      case `${actionTypePrefix}_FAILURE`:
        return state.merge({
          loading: false,
          loaded: false,
          data: null,
          validationErrors: formatValidationErrors(action.json),
          error: action.json.validationErrors ? null : Immutable.fromJS(action.json),
        });
      case `${actionTypePrefix}_RESET`:
        return newDefault;
      default:
        break;
    }

    return state;
  };
};
