const AWS = require('aws-sdk');
const cognitoidentity = new AWS.CognitoIdentity();

const params = {
    AllowUnauthenticatedIdentities: true,
    IdentityPoolName: 'serverless_store' 
};

cognitoidentity.createIdentityPool(params, (err, data) => {
    if (err) console.log(err, err.stack);
    else console.log(data.IdentityPoolId); // save the IdentityPoolId
});