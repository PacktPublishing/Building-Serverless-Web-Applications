const AWS = require('aws-sdk');
const simpledb = new AWS.SimpleDB(); 

module.exports.retrieveAllProducts = (callback) => {
    
    const selectParams = {
        SelectExpression: 'select * from Products'
    };

    simpledb.select(selectParams, (err, data) => { 
        if (err) callback(err); 
        else if (data.Items) {
            const products = [];
            data.Items.map(item => {

                const product = {};
                product.id = item.Name;

                const comment1 = {};
                const comment2 = {};

                item.Attributes.map(attr => {
                    switch(attr.Name) {
                        case 'Name':
                            product.name = attr.Value;
                            break;
                        case 'Price':
                            product.price = parseFloat(attr.Value) / 100;
                            break;
                        case 'Image':
                            product.image = attr.Value;
                            break;
                        case 'CommentID-1':
                            comment1.id = attr.Value;
                            break;
                        case 'CommentUsername-1':
                            comment1.username = attr.Value;
                            break;
                        case 'CommentDate-1':
                            comment1.age = '3 days ago'; //attr.Value; 
                            break;
                        case 'CommentText-1':
                            comment1.text = attr.Value;
                            break;
                        case 'CommentID-2':
                            comment2.id = attr.Value;
                            break;
                        case 'CommentUsername-2':
                            comment2.username = attr.Value;
                            break;
                        case 'CommentDate-2':
                            comment2.age = '7 days ago'; //attr.Value; 
                            break;
                        case 'CommentText-2':
                            comment2.text = attr.Value;
                            break;
                    }
                });

                const comments = [comment1, comment2];
                product.comments = comments;
                products.push(product);
            });

            callback(null, products);
        }
        else callback(null, []);
    });
};

module.exports.retrieveCart = (userId, callback) => {

    if (userId) {

        const selectParams = {
            SelectExpression: 'select ProductID from ShoppingCart'
        };

        simpledb.select(selectParams, (err, data) => { 
            if (err) callback(err); 
            else if (data.Items) {
                const selectedProducts = [];
                data.Items.map(item => {
                    item.Attributes.map(attr => {
                        if (attr.Value)
                            selectedProducts.push({ id: attr.Value });
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

        const attributes = [];

        products.forEach(product => {
            attributes.push({ Name: 'ProductID', Value: product.id, Replace: true });
        });

        if (products.length == 0) {
            attributes.push({ Name: 'ProductID', Value: '', Replace: true });
        }

        attributes.push({ Name: 'LastUpdate', Value: new Date().toISOString(), Replace: true });

        const putParams = { 
            DomainName: 'ShoppingCart',
            ItemName: userId,
            Attributes: attributes
        };

        simpledb.putAttributes(putParams, callback);
    } else {
        callback(null);
    }
};

module.exports.processCheckout = (id, callback) => {
    // do nothing
    callback(null);
};