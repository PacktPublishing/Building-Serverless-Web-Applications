'use strict';

const greetings = require('./greetings');

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: greetings.saySomething()
    })
  };

  callback(null, response);
};
