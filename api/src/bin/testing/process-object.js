'use strict';

const App = require('../cli-app');

Promise.all([
    App.create('image/image-service'),
    App.create('bookshelf'),
    App.create('source/source-model'),
    App.create('image/image-model'),
    App.create('image/image-file-model')
])
    .then((values) => ({
        imageService : values[0],
        bookshelf : values[1]
    }))
    .then((lib) => {
        return lib.imageService.createImageFromS3Key('david-unprocessed', 'Shared Pictures/2014.09.19_MikeJuliesWedding/DSC_0063.JPG')
            .then(() => lib.bookshelf.knex.destroy())
            .then(() => {
                console.log('done!');
            })
            .catch((err) => {

                console.error(err, err.stack);
                lib.bookshelf.knex.destroy();
            });
    });

