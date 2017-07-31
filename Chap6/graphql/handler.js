'use strict';

const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        cart: ShoppingCart
    }

    type ShoppingCart {
        products: [Product],
        promotionCode: String,
        discountPercentage: Int
    }

    type Product {
        name: String,
        code: String,
        quantity: Int,
        price: Int
    }
`);

const data = {
  "cart": {
    "products": [
      {
        "name": "Lonely Bird",
        "code": "FOO",
        "quantity": 1,
        "price": 2999
      },
      {
        "name": "Solid Friendship",
        "code": "BAR",
        "quantity": 1,
        "price": 1999
      }
    ],
    promotionCode: null,
    discountPercentage: 0
  }
};

module.exports.store = (event, context, callback) => {

  // this query would be received in the event.body
  // to make the example simpler, I've hard-coded it here
  const query = `{
    cart {
        products {
            name
            quantity
            price
        }
        discountPercentage
    }
  }`;

  graphql(schema, query, data).then((resp) => {
    const response = {
      statusCode: 200,   
      body: JSON.stringify(resp)
    };

    callback(null, response);
  });
};