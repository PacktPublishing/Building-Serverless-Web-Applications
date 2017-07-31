'use strict';

module.exports.catNames = (event, context, callback) => {

  const catNames = require('cat-names');

  const response = {
    statusCode: 200,   
    body: JSON.stringify({
      message: catNames.random()
    })
  };

  callback(null, response);
};