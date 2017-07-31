const AWS = require('aws-sdk');
const db = require('../repositories/fakedb');
const utils = require('./utils');

module.exports.processCheckout = (userId, callback) => {
    db.processCheckout((err, res) => {
        if (err) utils.errorHandler(err, callback);
        else {
            const iotdata = new AWS.IotData(); 
            const params = {
                topic: 'serverless-store-' + userId,
                payload: 'Your payment was confirmed.'
            };

            iotdata.publish(params, (err, res) => {
                console.log(err, res)
                if (err) utils.errorHandler(err, callback);
                else utils.successHandler(res, callback);
            });
        }
    });
};
