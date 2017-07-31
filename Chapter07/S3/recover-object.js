const params = { 
  Bucket: 'my-bucket-name',
  Key: 'file-path',
  VersionId: 'id' 
}; 

s3.getObject(params, (err, data) => { 
  // get contents and call putObject to replace the current version
});