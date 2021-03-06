'use strict';

class SourceModel {
    constructor(bookshelf) {

        bookshelf.model('image', {
            tableName : 'images',
            idAttribute : 'id',
            hasTimestamps : true,

            files() {
                return this.hasMany('image-file');
            },

            source() {
                return this.belongsTo('source');
            }
        });
    }
}

module.exports = SourceModel;
module.exports['@singleton'] = true;
module.exports['@require'] = ['bookshelf'];
