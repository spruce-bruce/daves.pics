'use strict';

class SourceModel {
    constructor(bookshelf) {

        bookshelf.model('sources', {
            tableName : 'sources',
            idAttribute : 'id'
        });
    }
}

module.exports = SourceModel;
module.exports['@singleton'] = true;
module.exports['@require'] = ['bookshelf'];
