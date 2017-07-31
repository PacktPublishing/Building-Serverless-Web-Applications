const db = require('../repositories/fakedb');
const utils = require('./utils');

module.exports.retrieveAll = (userId, callback) => {
    db.retrieveAllProducts((err, res) => {
        if (err) utils.errorHandler(err, callback);
        else utils.successHandler(res, callback);
    });
};
