const AWS = require('aws-sdk');
const sts = new AWS.STS();
const roleName = 'iot-notifications';

module.exports.auth = (event, context, callback) => {

    // get the account id that will be used to assume a role
    sts.getCallerIdentity({}, (err, data) => {
        if (err) return callback(err);

        const accountId = data.Account;
        const sessionId = getRandomInt().toString();

        const params = {
            RoleArn: `arn:aws:iam::${accountId}:role/${roleName}`,
            RoleSessionName: sessionId,
            DurationSeconds: 3600, // default is 3600 (1 hour) -> range from 900 to 3600
            Policy: getRestrictedPolicyDocument(accountId, sessionId)
        };

        // assume role returns temporary keys
        sts.assumeRole(params, (err, data) => {
            if (err) return callback(err);
           
            const res = buildResponseObject(data.Credentials.AccessKeyId,
                                            data.Credentials.SecretAccessKey,
                                            data.Credentials.SessionToken);

            callback(null, res);
        });
    });
};

const buildResponseObject = (accessKey, secretKey, sessionToken) => {
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }, 
        body: JSON.stringify({
            accessKey: accessKey,
            secretKey: secretKey,
            sessionToken: sessionToken
        })
    };
};

const getRestrictedPolicyDocument = (accountId, sessionId) => {
    return `{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Action": [
                    "iot:Connect", 
                    "iot:Subscribe", 
                    "iot:Publish", 
                    "iot:Receive"
                ],
                "Resource": "arn:aws:iot:us-east-1:${accountId}:topic/${sessionId}",
                "Effect": "Allow"
            }
        ]
    }`;
};

// Get random Int
const getRandomInt = () => {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
};