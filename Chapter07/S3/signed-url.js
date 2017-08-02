const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const params = {
    Bucket: 'bucket', 
    Key: 'key'
};

const operation = 'putObject'; // upload operation
// const operation = 'getObject'; // download operation

s3.getSignedUrl(operation, params, (err, url) => {
    // return the url
});