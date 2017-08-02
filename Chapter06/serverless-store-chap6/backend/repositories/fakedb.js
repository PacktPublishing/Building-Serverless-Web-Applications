module.exports.retrieveAllProducts = (callback) => {
    const comments = [{
        id: 1,
        username: "John Doe",
        age: "3 days ago",
        text: "I'm using this to decorate my desk. I liked it."
    }, {
        id: 2,
        username: "Jane Smith",
        age: "7 days ago",
        text: "This product was very well made."
    }];

    const products = [{
        id: "lonely-bird",
        name: "Lonely Bird",
        image: 'https://s3.amazonaws.com/serverless-store-media/product-images/lonely-bird.jpg',
        price: 29.99,
        comments: comments
    }, {
        id: "solid-friendship",
        name: "Solid Friendship",
        image: 'https://s3.amazonaws.com/serverless-store-media/product-images/solid-friendship.jpg',
        price: 19.99,
        comments: comments
    }];

    callback(null, products);
};

module.exports.retrieveCart = (userId, callback) => {

    const selectedProducts = [{
        id: "lonely-bird"
    }];  

    callback(null, selectedProducts);
};

module.exports.saveCart = (userId, products, callback) => {
    // do nothing
    callback(null);
};

module.exports.processCheckout = (id, callback) => {
    // do nothing
    callback(null);
};