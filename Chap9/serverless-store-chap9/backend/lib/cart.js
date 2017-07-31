const db = require('../repositories/fakedb');
const utils = require('./utils');

module.exports.saveCart = (id, userId, callback) => {
    db.saveCart(id, (err, res) => {
        if (err) utils.errorHandler(err, callback);
        else utils.successHandler(res, callback);
    });
};
