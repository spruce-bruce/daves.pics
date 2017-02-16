'use strict';

class ImageFileModel {
    constructor(bookshelf) {

        bookshelf.model('image-file', {
            tableName : 'image_files',
            idAttribute : 'key',
            hasTimestamps : true
        });
    }
}

module.exports = ImageFileModel;
module.exports['@singleton'] = true;
module.exports['@require'] = ['bookshelf'];
