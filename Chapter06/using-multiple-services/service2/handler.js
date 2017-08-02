'use strict';

const greetings = require('using-multiple-services1/greetings');

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: greetings.saySomething()
    })
  };

  callback(null, response);
};
