'use strict';
class SourceService {
    constructor(bookshelf) {
        this.bookshelf = bookshelf;
    }

    fetchSourceList() {
        return this.bookshelf.model('source').fetchAll();
    }
}

module.exports = SourceService;
module.exports['@singleton'] = true;
module.exports['@require'] = ['bookshelf'];
