'use strict';

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }, 
    body: JSON.stringify({
      message: `Hello, ${event.name}!`
      // message: `Hello, ${event.queryStringParameters.name}!` // use this piece of code when testing with the browser or API Gateway
    }),
  };

  callback(null, response);
};
