const db = require('../repositories/fakedb');
const utils = require('./utils');

module.exports.processCheckout = (callback) => {
    db.processCheckout((err, res) => {
        if (err) utils.errorHandler(err, callback);
        else utils.successHandler(res, callback);
    });
};
