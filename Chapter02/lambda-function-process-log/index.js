const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const sns = new AWS.SNS();

exports.handler = (event, context, callback) => {   
    const bucketName = event.Records[0].s3.bucket.name;
    const objectKey = event.Records[0].s3.object.key;
    const s3Params = { Bucket: bucketName, Key: objectKey };

    s3.getObject(s3Params, (err, data) => {
        if (err) throw err;   

        // check if file have errors to report
        const fileContent = data.Body.toString();   
        if (fileContent.indexOf('error') !== -1) {         
            const msg = `file ${objectKey} has errors`;
            const snsParams = { Message: msg, TopicArn: 'my-topic-arn' };
            sns.publish(snsParams, callback);
        }
    });
};
