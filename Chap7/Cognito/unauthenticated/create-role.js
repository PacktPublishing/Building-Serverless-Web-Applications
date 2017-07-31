const AWS = require('aws-sdk');
const iam = new AWS.IAM();
const sts = new AWS.STS();
const roleName = 'iot-notifications';
const identityPoolId = 'IDENTITY_POOL_ID';

// get the account id
sts.getCallerIdentity({}, (err, data) => {
    if (err) return console.log(err, err.stack);

    const createRoleParams = {
        AssumeRolePolicyDocument: `{
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "Federated": "cognito-identity.amazonaws.com"
              },
              "Action": "sts:AssumeRoleWithWebIdentity",
              "Condition": {
                "StringEquals": {
                  "cognito-identity.amazonaws.com:aud": "${identityPoolId}"
                },
                "ForAnyValue:StringLike": {
                  "cognito-identity.amazonaws.com:amr": "unauthenticated"
                }
              }
            }
          ]
        }`,
        RoleName: roleName
    };

    // create role
    iam.createRole(createRoleParams, (err, data) => {
        if (err) return console.log(err, err.stack);
        
        const attachPolicyParams = {
            PolicyDocument: `{
                "Version": "2012-10-17",
                "Statement": [
                    {
                         "Action": [
                             "iot:Connect", 
                             "iot:Subscribe", 
                             "iot:Publish", 
                             "iot:Receive"
                         ],
                         "Resource": "*",
                         "Effect": "Allow"
                    }
                ]
            }`,
            PolicyName: roleName,
            RoleName: roleName
        };
 
        // add iot policy
        iam.putRolePolicy(attachPolicyParams, (err, data) => {
            if (err) console.log(err, err.stack);
            else console.log(`Finished creating IoT Role: ${roleName}`); 
        });
    });
});