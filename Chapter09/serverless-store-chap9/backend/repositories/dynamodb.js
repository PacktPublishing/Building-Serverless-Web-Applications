const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB(); 
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.retrieveAllProducts = (callback) => {
    
    const params = {
        TableName: 'Products'
    };

    documentClient.scan(params, (err, data) => {
        if (err) callback(err); 
        else if (data.Items) {
            const products = [];
            data.Items.map(item => {
                products.push({
                    id: item.ID,
                    name: item.Name,
                    price: item.Price,
                    image: item.Image,
                    comments: [
                        { 
                            id: item.Comments[0].ID, 
                            username: item.Comments[0].Username, 
                            age: '3 days ago', //item.Comments[0].Date, 
                            text: item.Comments[0].Text
                        },
                        { 
                            id: item.Comments[1].ID, 
                            username: item.Comments[1].Username, 
                            age: '7 days ago', //item.Comments[1].Date, 
                            text: item.Comments[1].Text
                        },
                    ]
                });                
            });

            callback(null, products);
        }
        else callback(null, []);
    });
};

module.exports.retrieveCart = (userId, callback) => {

    if (userId) {

        const params = {
            TableName: "ShoppingCart",
            KeyConditionExpression: "UserID = :userId",
            ExpressionAttributeValues: { ":userId": userId }
        };

        documentClient.query(params, (err, data) => {
            if (err) callback(err); 
            else if (data.Items) {
                const selectedProducts = [];
                data.Items[0].SelectedProducts.map(item => {
                    selectedProducts.push({
                        id: item.ID
                    });                
                });

                callback(null, selectedProducts);
            }
            else callback(null, []);
        });
    } else {
        callback(null, []);
    }
};

module.exports.saveCart = (userId, products, callback) => {

    if (userId) {

        const params = {
            TableName: "ShoppingCart",
            Item: {
                UserID: userId,
                LastUpdate: new Date().toISOString(),
                SelectedProducts: products.map(p => { return {ID: p.id} })
            }
        };

        documentClient.put(params, callback);
    } else {
        callback(null);
    }
};

module.exports.processCheckout = (id, callback) => {
    // do nothing
    callback(null);
};
    