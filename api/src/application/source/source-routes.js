'use strict';
module.exports = (service) => {

    return [{
        method: 'GET',
        path: '/sources/list',
        handler: (request, reply) => {
            reply(service.fetchSourceList());
        }
    }];
};

module.exports['@singleton'] = true;
module.exports['@require'] = ['source/source-service'];
