const AWS = require('aws-sdk');

AWS.config.region = 'YOUR_COGNITO_REGION';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'IDENTITY_POOL_ID',
});

AWS.config.credentials.get(() => {

    // Use these credentials with IoT
    const accessKeyId = AWS.config.credentials.accessKeyId;
    const secretAccessKey = AWS.config.credentials.secretAccessKey;
    const sessionToken = AWS.config.credentials.sessionToken;
});