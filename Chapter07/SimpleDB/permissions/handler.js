'use strict';

const AWS = require('aws-sdk');
const simpledb = new AWS.SimpleDB(); 

module.exports.query = (event, context, callback) => {

    const selectParams = {
        SelectExpression: 'select * from Products where Name = "Lonely Bird"'
    };

    simpledb.select(selectParams, callback);
};

