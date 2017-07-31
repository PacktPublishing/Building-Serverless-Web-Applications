'use strict';

// this function will be implemented in Chapter 8, Securing Serverless Applications
module.exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200
  };

  callback(null, response);
};
