const AWS = require('aws-sdk');
const cognitoidentity = new AWS.CognitoIdentity();

const params = {
  IdentityPoolId: 'IDENTITY_POOL_ID',
  Roles: { 
    unauthenticated: 'ROLE_ARN',
    authenticated: 'ROLE_ARN'
  }
};

cognitoidentity.setIdentityPoolRoles(params, (err, data) => {
  if (err) console.log(err, err.stack);
  else     console.log(data); // successful response returns an empty object
});