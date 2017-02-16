'use strict';
const App = require('./cli-app');

Promise.all([
    App.create('aws')
])
    .then((values) => ({
        AWS: values[0]
    }))
    .then((lib) => {

        const sqs = new lib.AWS.SQS();

        const params = {
            MessageAttributes: {
                type: {
                    DataType: 'String',
                    StringValue: 'prefix'
                },
                source: {
                    DataType: 'String',
                    StringValue: 'wd-cloud'
                }
            },
            MessageBody: 'Shared Pictures/',
            QueueUrl: 'https://sqs.us-west-2.amazonaws.com/071794271341/shared-queue'
        };

        sqs.sendMessage(params, (err, data) => {

            if (err) {
                console.log(err, err.stack);
            }
            else {
                console.log(data);
            }
        });
    });
