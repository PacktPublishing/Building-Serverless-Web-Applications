'use strict';

module.exports.testPermissions = (event, context, callback) => {

  const AWS = require('aws-sdk');
  const s3 = new AWS.S3();
  const bucket = 'my-bucket-name';
  const key = 'my-file-name';
  const write = { 
    Bucket: bucket, 
    Key: key, 
    Body: 'Test' 
  };

  s3.putObject(write, (err, data) => {
    if (err) return callback(err);

    const read = { 
      Bucket: bucket, 
      Key: key 
    };

    s3.getObject(read, (err, data) => {
      if (err) return callback(err);

      const response = {
        statusCode: 200,   
        body: data.Body.toString()
      };

      callback(null, response);
    });
  });
};
