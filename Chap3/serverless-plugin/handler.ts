'use strict';

export async function hello(event, context, callback) {

  const response = {
    statusCode: 200,   
    body: JSON.stringify({
      message: 'Hello, TypeScript!'
    })
  };

  callback(null, response);
}