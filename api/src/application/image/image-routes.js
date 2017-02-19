'use strict';

const Joi = require('joi');

module.exports = (service) => {

    return [
        {
            method: 'GET',
            path: '/images/list',
            handler: (request, reply) => {

                reply(service.fetchImageList(request.query));
            },
            config: {
                validate: {
                    query: {
                        page: Joi.number()
                    }
                }
            }
        }
    ];
};

module.exports['@singleton'] = true;
module.exports['@require'] = ['image/image-service'];
