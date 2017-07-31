// Create DynamoDB tables and insert initial data

const uuidv4 = require('uuid/v4');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const documentClient = new AWS.DynamoDB.DocumentClient();

const productsTable = {
    TableName: 'Products',
    AttributeDefinitions: [
        {
            AttributeName: 'ID',
            AttributeType: 'S' // string
        }
    ],
    KeySchema: [
        {
            AttributeName: 'ID',
            KeyType: 'HASH'
        }   
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5, // default value
        WriteCapacityUnits: 5 // default value
    } 
};

const insertProducts = () => {
    
    const s3Bucket = 'https://s3.amazonaws.com/serverless-store-media/product-images/';

    const generateComment = () => {
        const id1 = uuidv4();
        const id2 = uuidv4();
        return [
            {
                ID: id1,
                Username: 'John Doe',
                Date: '2016-12-24T17:15:10.000Z',
                Text: `I'm using this to decorate my desk. I liked it.`
            },
            {
                ID: id2,
                Username: 'Jane Smith',
                Date: '2016-12-24T18:15:10.000Z',
                Text: 'This product was very well made.'
            }
        ]
    };

    const comments = [];
    for (let i = 0; i < 9; i++) {
        comments.push(generateComment());
    }

    const insertParams = {
        RequestItems: {
            'Products': [
                {
                    PutRequest: {
                        Item: {
                            ID: 'lonely-bird',
                            Name: 'Lonely Bird',
                            Price: 29.99,
                            Image: s3Bucket + 'lonely-bird.jpg',
                            Comments: comments[0]
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            ID: 'solid-friendship',
                            Name: 'Solid Friendship',
                            Price: 19.99,
                            Image: s3Bucket + 'solid-friendship.jpg',
                            Comments: comments[1]
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            ID: 'thanksgiving',
                            Name: 'Thanksgiving',
                            Price: 39.99,
                            Image: s3Bucket + 'thanksgiving.jpg',
                            Comments: comments[2]
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            ID: 'old-man',
                            Name: 'Old Man',
                            Price: 19.99,
                            Image: s3Bucket + 'old-man.jpg',
                            Comments: comments[3]
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            ID: 'lait-cow',
                            Name: 'Lait Cow',
                            Price: 59.99,
                            Image: s3Bucket + 'lait-cow.jpg',
                            Comments: comments[4]
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            ID: 'chicken',
                            Name: 'Chicken',
                            Price: 29.99,
                            Image: s3Bucket + 'chicken.jpg',
                            Comments: comments[5]
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            ID: 'hare',
                            Name: 'Hare',
                            Price: 49.99,
                            Image: s3Bucket + 'hare.jpg',
                            Comments: comments[6]
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            ID: 'fall',
                            Name: 'Fall',
                            Price: 19.99,
                            Image: s3Bucket + 'fall.jpg',
                            Comments: comments[7]
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            ID: 'gardener',
                            Name: 'Gardener',
                            Price: 39.99,
                            Image: s3Bucket + 'gardener.jpg',
                            Comments: comments[8]
                        }
                    }
                }                                                                                                                                
            ]
        }
    };
    
    documentClient.batchWrite(insertParams, (err, data) => {
        if (err) console.log(err, err.stack);
        else console.log(data);
    });
};

dynamodb.createTable(productsTable, (err, data) => {
    if (err) return console.log(err, err.stack);

    const params = {
        TableName: 'Products'
    };

    dynamodb.waitFor('tableExists', params, (err, data) => {
        if (err) console.log(err, err.stack);
        else     insertProducts();
    });    
});

const cartTable = {
    TableName: 'ShoppingCart',
    AttributeDefinitions: [
        {
            AttributeName: 'UserID',
            AttributeType: 'S' // string
        }
    ],
    KeySchema: [
        {
            AttributeName: 'UserID',
            KeyType: 'HASH'
        }   
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5, // default value
        WriteCapacityUnits: 5 // default value
    } 
};

dynamodb.createTable(cartTable, (err, data) => {
    if (err) console.log(err, err.stack);
    else console.log(data);
});