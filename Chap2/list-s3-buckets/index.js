const AWS = require('aws-sdk');
const s3 = new AWS.S3();

s3.listBuckets((err, data) => {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data.Buckets); // successful response
});
