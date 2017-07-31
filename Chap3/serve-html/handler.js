'use strict';

module.exports.hello = (event, context, callback) => {

  const html = `
    <html>
      <head>
        <title>Page Title</title>
      </head>
      <body>
        <h1>Hello</h1>
      </body>
    </html>`;

  const response = {    
    statusCode: 200, 
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/html'
    }, 
    body: html
  };

  callback(null, response);
};
