'use strict';

const Joi = require('joi');

module.exports = (service, mixedValidation, rowExists) => {

    return [
        {
            method: 'GET',
            path: '/images/list',
            handler: (request, reply) => {

                reply(service.fetchImageList(request.query));
            },
            config: {
                validate: {
                    query: mixedValidation({
                        source: Joi.string(),
                        page: Joi.number().integer(),
                        collectionId: Joi.number().integer(),
                    }, {
                        source: rowExists('source', 'id', 'Source not found'),
                        collectionId: rowExists('collection', 'id', 'Collection not found'),
                    })
                }
            }
        }
    ];
};

module.exports['@singleton'] = true;
module.exports['@require'] = [
    'image/image-service',
    'validator/mixed-validation',
    'validator/constraints/row-exists'
];
