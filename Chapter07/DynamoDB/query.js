const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

const params = {
    TableName: "Products",
    KeyConditionExpression: "ID = :id",
    ExpressionAttributeValues: { ":id": "lonely-bird" }
};

documentClient.query(params, function(err, data) {
   if (err) console.log(err);
   else console.log(data);
});