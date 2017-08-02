const AWS = require('aws-sdk');
const db = require('../repositories/dynamodb');
const utils = require('./utils');

module.exports.processCheckout = (id, callback) => {
    db.processCheckout(id, (err, res) => {
        if (err) utils.errorHandler(err, callback);
        else {
            const iotdata = new AWS.IotData({endpoint: process.env.IOT_ENDPOINT}); 
            const params = {
                topic: 'serverless-store-' + id,
                payload: 'Your payment was confirmed.'
            };

            iotdata.publish(params, (err, res) => {
                if (err) utils.errorHandler(err, callback);
                else utils.successHandler(res, callback);
            });
        }
    });
};
