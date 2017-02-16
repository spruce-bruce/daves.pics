'use strict';

class SourceModel {
    constructor(bookshelf) {

        bookshelf.model('image', {
            tableName : 'images',
            idAttribute : 'id',
            hasTimestamps : true
        });
    }
}

module.exports = SourceModel;
module.exports['@singleton'] = true;
module.exports['@require'] = ['bookshelf'];
