'use strict';
require('colors');

class CollectionService {
    constructor(bookshelf) {
        this.bookshelf = bookshelf;
    }

    processImageCollection(image) {
        console.log(`Processing image's collection for ${image.get('id')}`.blue);

        return image.load('source').then(imageWithSource => {
            console.log(imageWithSource.related('source').get('type'));
            switch (imageWithSource.related('source').get('type')) {
                case 'filesystem':
                    return this.processFilesystemCollection(imageWithSource);
                    break;
            }
        });
    }

    processFilesystemCollection(image) {
        const path = image.get('source_meta').split('/');
        let promise = Promise.resolve();
        for (let i = 0; i < path.length - 1; ++i) {
            promise = promise.then(collection => this.fetchOrCreateCollection(
                path[i],
                image.get('source_id'),
                collection ? collection.get('id') : null)
            );
        }

        return promise.then(collection => {
            console.log(`the collection that this image ${image.get('id')} belongs to is ${collection.get('name')} : ${collection.get('id')}`);
            return image.set('collection_id', collection.get('id')).save();
        })
            .then(() => console.log(`Successfully set collection for image ${image.get('id')}`.green));
    }

    fetchOrCreateCollection(name, sourceId, parentCollectionId) {
        return this.bookshelf.model('collection').where({ name, source_id: sourceId }).fetch()
            .then(collection => {
                return collection
                    ? collection
                    : this.bookshelf.model('collection').forge().save({ name, source_id: sourceId, parent_collection: parentCollectionId });
            });

    }
}

module.exports = CollectionService;
module.exports['@singleton'] = true;
module.exports['@require'] = ['bookshelf'];
