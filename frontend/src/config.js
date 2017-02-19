import merge from './common/utils/merge';

const defaults = {
  validationMessages: {},
};

const environments = {
  development: {},
  qa: {},
  staging: {},
  production: {},
};

export default merge(defaults, environments[process.env.REACT_APP_ENV]);
