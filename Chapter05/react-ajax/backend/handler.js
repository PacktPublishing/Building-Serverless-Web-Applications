'use strict';

module.exports.products = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      products: [
        {
          id: 1,
          name: 'Lonely Bird',
          price: 29.99,
          isSelected: false
        }, 
        {
          id: 2,
          name: 'Solid Friendship',
          price: 19.99,
          isSelected: false
        }
      ]
    }),
  };

  callback(null, response);
};

module.exports.save = (event, context, callback) => {

  let response = {};

  if (event.httpMethod === 'POST') {
    response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ saved: true })
    }
  } else if (event.httpMethod === 'OPTIONS') {
    response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'origin, content-type, accept',
        'Access-Control-Allow-Methods': 'POST, PUT, OPTIONS'
      }
    }
  }

  callback(null, response);
};