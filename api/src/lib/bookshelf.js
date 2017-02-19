'use strict';
module.exports = (knex) => {

    const bookshelf = require('bookshelf')(knex);
    bookshelf.plugin('registry');
    bookshelf.plugin('pagination');
    return bookshelf;
};

module.exports['@singleton'] = true;
module.exports['@require'] = ['knex'];
