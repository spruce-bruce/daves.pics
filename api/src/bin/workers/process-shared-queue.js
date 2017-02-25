'use strict';

require('colors');
const App = require('../cli-app');
const Buckets = require('../../../config')('/fileBuckets');

let imageService;
let sqs;
let s3;

const deleteMessage = function (message) {

    console.log(`Deleting message ${message.MessageId}`.magenta);
    sqs.deleteMessage({
        QueueUrl: 'https://sqs.us-west-2.amazonaws.com/071794271341/shared-queue',
        ReceiptHandle: message.ReceiptHandle
    }, (err, data) => {

        if (err) {
            console.logg(err, err.stack);
        }
    });
};

const enqueuePrefix = function (prefix, source) {

    return new Promise((resolve, reject) => {

        const prefixParams = {
            MessageAttributes: {
                type: {
                    DataType: 'String',
                    StringValue: 'prefix'
                },
                source: {
                    DataType: 'String',
                    StringValue: source
                }
            },
            MessageBody: prefix.Prefix,
            QueueUrl: 'https://sqs.us-west-2.amazonaws.com/071794271341/shared-queue'
        };

        sqs.sendMessage(prefixParams, (err, data) => {

            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};

const enqueueObject = function (object, source) {

    return new Promise((resolve, reject) => {

        const prefixParams = {
            MessageAttributes: {
                type: {
                    DataType: 'String',
                    StringValue: 'object'
                },
                source: {
                    DataType: 'String',
                    StringValue: source
                }
            },
            MessageBody: object.Key,
            QueueUrl: 'https://sqs.us-west-2.amazonaws.com/071794271341/shared-queue'
        };
        sqs.sendMessage(prefixParams, (err, data) => {

            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};

const handlePrefix = function (message) {

    console.log(`Handling prefix ${message.Body}`.blue);
    const params = {
        Bucket: Buckets.sourceBucket,
        Delimiter: '/',
        Prefix: message.Body
    };

    return s3.listObjectsV2(params).promise()
        .then((data) => {

            if (data.IsTruncated) {
                throw new Error('BIG PROBLEM TRUNCATED DATA'.red);
            }

            let promises = data.CommonPrefixes.map((commonPrefix) => enqueuePrefix(commonPrefix, message.MessageAttributes.source.StringValue));
            promises = promises.concat(data.Contents.map((object) => {

                if (object.Key !== message.Body) {
                    return enqueueObject(object, message.MessageAttributes.source.StringValue);
                }

                return Promise.resolve();
            }));

            return Promise.all(promises);
        })
        .catch((err) => {

            console.error(err, err.stack);
            console.error(`Unable to process prefix ${message.Body}`.red);
        });
};

const handleObject = function (message) {

    console.log(`Handling object ${message.Body}`.blue);

    return imageService.createImageFromS3Key(
        Buckets.sourceBucket,
        message.Body,
        message.MessageAttributes.source.StringValue
    )
        .catch((err) => {

            console.error(err, err.stack);
            console.log(`Unable to process object ${message.Body}`.red);
            return imageService.bucketCopy(message.Body, Buckets.sourceBucket, Buckets.unprocessableBucket);
        })
        .catch(() => console.error(`unable to copy ${message.Body} to unprocessable`.red));
};

const readMessage = function () {
    const concurrency = 2;
    const params = {
        AttributeNames: [
            'All'
        ],
        MaxNumberOfMessages: concurrency,
        VisibilityTimeout: 60 * concurrency,
        MessageAttributeNames: [
            'All'
        ],
        QueueUrl: 'https://sqs.us-west-2.amazonaws.com/071794271341/shared-queue',
        WaitTimeSeconds: 20
    };

    sqs.receiveMessage(params).promise()
        .then((data) => {
            if (data.Messages) {
                const msgCount = data.Messages.length;
                console.log(`Received ${msgCount} message${msgCount > 1 ? 's' : ''}!`.green);

                return Promise.all(data.Messages.map((message) => {

                    if (message.MessageAttributes.source.StringValue !== 'wd-cloud') {
                        throw new Error('Something\'s wrong');
                        deleteMessage(message);
                    }

                    let promise;
                    if (message.MessageAttributes.type.StringValue === 'prefix') {
                        promise = handlePrefix(message);
                    }
                    else {
                        promise = handleObject(message);
                    }

                    return promise.then(() => deleteMessage(message));
                }));
            }

            console.log('received nothing'.yellow);
        })
        .then(() => {
            console.log('Calling readMessage'.cyan);
            readMessage();
        });
};

Promise.all([
    App.create('image/image-service'),
    App.create('aws'),

    App.create('source/source-model'),
    App.create('image/image-model'),
    App.create('image/image-file-model'),
    App.create('collection/collection-model'),
])
    .then((values) => {

        imageService = values[0];
        sqs = new values[1].SQS();
        s3 = new values[1].S3();
    })
    .then(() => readMessage());
