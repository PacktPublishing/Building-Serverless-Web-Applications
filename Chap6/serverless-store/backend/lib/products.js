const db = require('../repositories/fakedb');

module.exports.retrieveAll = (callback) => {
    db.retrieveAllProducts(callback);
};
