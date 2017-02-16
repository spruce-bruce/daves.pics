'use strict';
const Confidence = require('confidence');

const config = {
    '$filter': 'env',
    '$base': {
        dbConnection: {
            host: process.env.POSTGRES_HOST,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            port: process.env.POSTGRES_PORT
        },
        auth: {
            secret: process.env.JWT_SECRET
        },
        fileBuckets: {
            sourceBucket: process.env.SOURCE_BUCKET,
            destinationBucket: process.env.DESTINATION_BUCKET,
            unprocessableBucket: process.env.UNPROCESSABLE_BUCEKT
        }
    },
    'development': {},
    'qa': {},
    'staging': {},
    'production': {}
};

module.exports = (path, criteria) => {

    const store = new Confidence.Store();
    path = path ? path : '/';
    criteria = criteria ? criteria : {};
    criteria.env = process.env.NODE_ENV || 'development';

    store.load(config);
    return store.get(path, criteria);
};
