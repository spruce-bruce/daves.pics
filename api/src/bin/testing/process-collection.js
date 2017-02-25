'use strict';
const App = require('../cli-app');

Promise.all([
    App.create('image/image-service'),
    App.create('bookshelf'),
    App.create('collection/collection-service'),
    App.create('source/source-model'),
    App.create('image/image-model'),
    App.create('image/image-file-model'),
    App.create('collection/collection-model'),
])
    .then((values) => ({
        imageService : values[0],
        bookshelf : values[1],
        collectionService : values[2],
    }))
    .then((lib) => lib.bookshelf.model('image').forge()
        .where('id', 'in', ['08b942ce-91c4-4a8b-965f-6f0094a41050', '0addb723-c16b-4db2-920f-7692b4d81995'])
        // .where('id', 'in', ['08f42510-4bef-4bdd-8833-2aef79d6c469', '07b3a457-477f-4983-81a8-ede64beb197d'])
        .fetchAll()
        .then(images =>
            Promise.all(images.map(image => lib.collectionService.processImageCollection(image)))
        )
        .then(() => lib.bookshelf.knex.destroy())
        .then(() => console.log('done!'))
        .catch(err => {
            console.error(err, err.stack);
            lib.bookshelf.knex.destroy();
        })
    );
