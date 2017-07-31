'use strict';

module.exports.hello = (event, context, callback) => {
  
    if (event.source === 'serverless-plugin-warmup') {
        console.log('WarmUP - Lambda is warm!')
        return callback(null, 'Lambda is warm!')
    }
    
    callback(null, { message: 'Hello!' });
};
