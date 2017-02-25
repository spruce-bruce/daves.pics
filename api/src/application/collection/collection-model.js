'use strict';

class CollectionModel {
    constructor(bookshelf) {
        bookshelf.model('collection', {
            tableName : 'collections',
            idAttribute : 'id',
            hasTimestamps : true,
        });
    }
}

module.exports = CollectionModel;
module.exports['@singleton'] = true;
module.exports['@require'] = ['bookshelf'];
