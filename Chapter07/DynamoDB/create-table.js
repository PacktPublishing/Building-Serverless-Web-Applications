const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

let params = {
    TableName: 'Products',
    AttributeDefinitions: [
        {
            AttributeName: 'ID',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'ID',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }  
};

dynamodb.createTable(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log(data);
});

params = {
    TableName: 'ShoppingCart',
    AttributeDefinitions: [
        {
            AttributeName: 'UserID',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'UserID',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }  
};

dynamodb.createTable(params, (err, data) => {
    if (err) console.log(err, err.stack);
    else     console.log(data);
});