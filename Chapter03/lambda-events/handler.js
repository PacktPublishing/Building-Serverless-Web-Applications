'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const sns = new AWS.SNS();

module.exports.processLog = (event, context, callback) => {

  const bucketName = event.Records[0].s3.bucket.name;
  const objectKey = event.Records[0].s3.object.key;
  const s3Params = { 
    Bucket: bucketName, 
    Key: objectKey 
  };

  s3.getObject(s3Params, (err, data) => {
    if (err) throw err;   

    // check if file have errors to report
    const fileContent = data.Body.toString();   
    if (fileContent.indexOf('error') !== -1) {         
      const msg = `file ${objectKey} has errors`;
      const snsParams = { 
        Message: msg, 
        TopicArn: 'arn:aws:sns:us-east-1:1234567890:email-alerts' // use you account number and SNS topic
      };

      sns.publish(snsParams, callback);
    }
  });
};

module.exports.processTask = (event, context, callback) => {

  const time = new Date().toUTCString();
  const msg = `Lambda triggered on ${time}`;
  const snsParams = { 
    Message: msg, 
    TopicArn: 'arn:aws:sns:us-east-1:1234567890:email-alerts' // use you account number and SNS topic
  };

  sns.publish(snsParams, callback);
};
