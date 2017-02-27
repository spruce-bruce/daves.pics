'use strict';
require('colors');

class CollectionService {
    constructor(bookshelf) {
        this.bookshelf = bookshelf;
    }

    fetchCollectionList(sourceId) {
        // return Promise.resolve({ message: `source ${sourceId}` });
        return this.bookshelf.model('collection')
            .where('source_id', sourceId)
            .orderBy('parent_collection')
            .fetchAll()
            .then(collectionList => {
                collectionList = collectionList.serialize();
                const nestedCollection = [];
                const collectionMap = {};

                while (collectionList.length) {
                    const collection = collectionList.shift();
                    collectionMap[collection.id] = collection;

                    if (collection.parent_collection === null) {
                        nestedCollection.push(collection);
                    } else if (collectionMap[collection.parent_collection]) {
                        let children = collectionMap[collection.parent_collection].children;
                        children = children ? children : [];
                        children.push(collection);
                        collectionMap[collection.parent_collection].children = children;
                    } else {
                        collectionList.push(collection);
                    }
                }

                return nestedCollection;
            });
    }

    processImageCollection(image) {
        console.log(`Processing image's collection for ${image.get('id')}`.blue);

        return image.load('source').then(imageWithSource => {
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
