const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

const params = {
    TableName: 'TableWithIndexes',
    AttributeDefinitions: [
        {
            AttributeName: 'ID',
            AttributeType: 'S'
        },
        {
            AttributeName: 'MyOtherAttribute',
            AttributeType: 'S'
        },
        {
            AttributeName: 'MyLocalAttribute',
            AttributeType: 'S'
        },
        {
            AttributeName: 'MyGlobalAttribute',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'ID',
            KeyType: 'HASH'
        },
        {
            AttributeName: 'MyOtherAttribute',
            KeyType: 'RANGE'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    },
    LocalSecondaryIndexes: [
        {
            IndexName: 'MyLocalIndex',
            KeySchema: [
                {
                    AttributeName: 'ID',
                    KeyType: 'HASH'
                },                
                {
                    AttributeName: 'MyLocalAttribute',
                    KeyType: 'RANGE'
                }
            ],
            Projection: {
                ProjectionType: 'ALL'
            }
        }
    ],
    GlobalSecondaryIndexes: [
        {
            IndexName: 'MyGlobalIndex',
            KeySchema: [
                {
                    AttributeName: 'MyGlobalAttribute',
                    KeyType: 'HASH'
                }
            ],
            Projection: {
                ProjectionType: 'ALL'
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        }
    ]
};

dynamodb.createTable(params, (err, data) => {
    if (err) console.log(err, err.stack);
    else     console.log(data);
});