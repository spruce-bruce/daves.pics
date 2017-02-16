const AWS = require('aws-sdk');

module.exports = () => {
  AWS.config.correctClockSkew = true;
  AWS.config.update({region: 'us-west-1'});
  AWS.config.apiVersions = {
    sqs: '2012-11-05',
    s3: '2006-03-01',
    // other service API versions
  };

  return AWS;
};

module.exports['@singleton'] = true;
module.exports['@require'] = [];
