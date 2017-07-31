'use strict';

module.exports.hello = (event, context, callback) => {
    const message = `Hello, ${event.name}!`
    callback(null, message);
};
