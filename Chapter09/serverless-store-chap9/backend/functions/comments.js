'use strict';

const utils = require('../lib/utils');

module.exports.handler = (event, context, callback) => {

    console.log(event);
    utils.successHandler(event, callback);
};
