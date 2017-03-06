'use strict';

require('colors');
const Assert = require('assert');
const Gm = require('gm');
const Uuid = require('uuid');
const Buckets = require('../../../config')('/fileBuckets');

const allowedContentTypes = [
    'image/gif',
    'image/jpeg',
    'image/png'
];

class ImageService {
    constructor(aws, bookshelf, collectionService) {
        this.destinationBucket = Buckets.destinationBucket;
        this.s3 = new aws.S3();
        this.bookshelf = bookshelf;
        this.collectionService = collectionService;
    }

    fetchImageList(search) {
        const query = this.bookshelf.model('image').forge()
            .orderBy('created_at', 'DESC');

        if (search.source) {
            query.where('source_id', search.source);
        }

        let collectionQueryPromise;
        if (search.collectionId) {
            collectionQueryPromise = this.collectionService.fetchDescendants(search.collectionId)
                .then(collections => collections.map(collection => collection.get('id')))
                .then(collectionIds => query.where('collection_id', 'IN', collectionIds));
        } else {
            collectionQueryPromise = Promise.resolve();
        }

        return collectionQueryPromise
            .then(() => query.fetchPage({
                withRelated: ['files'],
                page: search.page,
                pageSize: 9
            }))
            .then((collection) => {

                return {
                    pagination: collection.pagination,
                    collection
                };
            });
    }

    makeThumb(imageBuffer, height) {
        console.log('Creating thumbnail...'.blue);

        return new Promise((resolve, reject) => {

            Gm(imageBuffer).resize(null, height)
                .noProfile()
                .quality(50)
                .toBuffer((err, buffer) => {

                    if (err) {
                        reject(err);
                    }

                    console.log('Thumbnail complete!'.green);
                    resolve(buffer);
                });
        });
    }

    uploadImage(buffer, filename, destinationBucket) {
        console.log(`beginning file upload for ${filename}...`.blue);
        const uploadParams = { Bucket: destinationBucket || this.destinationBucket, Key: filename, Body: buffer };
        return this.s3.upload(uploadParams).promise()
            .then((uploadData) => {

                console.log(`Successfully uploaded ${filename}!`.green);
                return uploadData;
            });
    }

    getImageInfo(buffer) {
        return new Promise((resolve, reject) => {

            Gm(buffer).identify((err, data) => {

                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }

    makeImageRecord(key, imageDataList) {
        console.log(`Creating image record for ${key}...`.blue);

        return this.bookshelf.model('image').forge()
            .save({
                id : Uuid.v4(),
                source_id : 'wd-cloud',
                source_meta : key
            }, { method: 'insert' })
            .then(image => {
                return this.collectionService.processImageCollection(image).then(() => image);
            })
            .then((image) => Promise.all(imageDataList.map((imageData, idx) =>
                this.bookshelf.model('image-file').forge().save({
                    key : imageData[0].key,
                    image_id : image.get('id'),
                    bucket : this.destinationBucket,
                    type : idx === 0 ? 'original' : 'thumb',
                    location : imageData[0].Location,
                    width : imageData[1].size.width,
                    height : imageData[1].size.height,
                    image_data : imageData[1]
                }, { method: 'insert' }))
            )
            .then(() => console.log(`Image object created successfully with id ${image.get('id')}`.green))
        );
    }

    createImageFromS3Key(sourceBucket, key) {
        console.log(`Creating image: ${key}`.cyan);
        const params = {
            Bucket: sourceBucket,
            Key: key
        };

        return this.s3.getObject(params).promise()
            .then((data) => {

                Assert(allowedContentTypes.indexOf(data.ContentType) !== -1);
                console.log('Successfully fetched image from s3!'.green);

                const timestamp = Math.floor(Date.now() / 1000).toString();
                const keyParts = key.split('/');
                const filename = `${timestamp}.orig.${keyParts[keyParts.length - 1]}`;
                const thumb250Name = `${timestamp}.250.${keyParts[keyParts.length - 1]}`;
                const thumb1000Name = `${timestamp}.1000.${keyParts[keyParts.length - 1]}`;

                return Promise.all([
                    Promise.all([this.uploadImage(data.Body, filename), this.getImageInfo(data.Body)]),
                    this.makeThumb(data.Body, 250).then((buffer) => Promise.all([this.uploadImage(buffer, thumb250Name), this.getImageInfo(buffer)])),
                    this.makeThumb(data.Body, 1000).then((buffer) => Promise.all([this.uploadImage(buffer, thumb1000Name), this.getImageInfo(buffer)]))
                ])
                    .then((values) => this.makeImageRecord(key, values));
            });
    }

    bucketCopy(key, sourceBucket, destinationBucket) {
        console.log(`Copying ${key} from ${sourceBucket} to ${destinationBucket}`.cyan);
        const params = {
            Bucket: sourceBucket,
            Key: key
        };

        return this.s3.getObject(params).promise()
            .then((data) => this.uploadImage(data.Body, key, destinationBucket));
    }
}

module.exports = ImageService;
module.exports['@singleton'] = true;
module.exports['@require'] = ['aws', 'bookshelf', 'collection/collection-service'];
