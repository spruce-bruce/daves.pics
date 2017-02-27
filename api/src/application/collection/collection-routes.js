'use strict';
const Joi = require('joi');
module.exports = (service, mixedValidation, rowExists) => {
    return [{
        method: 'GET',
        path: '/source/{sourceId}/collection/list',
        handler: (request, reply) => {
            reply(service.fetchCollectionList(request.params.sourceId));
        },
        config: {
            validate: {
                params : mixedValidation({
                    sourceId: Joi.string().required()
                }, {
                    sourceId: rowExists('source', 'id', 'Source not found')
                })
            }
        }
    }];
};

module.exports['@singleton'] = true;
module.exports['@require'] = [
    'collection/collection-service',
    'validator/mixed-validation',
    'validator/constraints/row-exists'
];
