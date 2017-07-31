const db = require('../repositories/dynamodb');
const utils = require('./utils');

module.exports.processCheckout = (id, callback) => {
    db.processCheckout(id, (err, res) => {
        if (err) utils.errorHandler(err, callback);
        else utils.successHandler(res, callback);
    });
};
