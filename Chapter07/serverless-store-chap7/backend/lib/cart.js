const db = require('../repositories/dynamodb');
const utils = require('./utils');

module.exports.saveCart = (userId, products, callback) => {
    db.saveCart(userId, products, (err, res) => {
        if (err) utils.errorHandler(err, callback);
        else utils.successHandler(res, callback);
    });
};
