const AWS = require('aws-sdk');
const s3 = AWS.S3();

const params = { 
  Bucket: 'my-bucket-name',
  Prefix: 'folder-or-file-path'
}; 

s3.listObjectVersions(params, (err, data) => { 
  if (err) console.log(err, err.stack);
  else console.log(data.Versions); // array containing VersionId and LastModified (Date)
});