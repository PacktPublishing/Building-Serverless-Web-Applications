const db = require('../repositories/dynamodb');
const utils = require('./utils');

module.exports.retrieveAll = (userId, callback) => {
    db.retrieveAllProducts((err, products) => {
        if (err) return utils.errorHandler(err, callback);

        db.retrieveCart(userId, (err, selectedProducts) => {
            if (err) utils.errorHandler(err, callback);
            else {

                if (selectedProducts) {
                    selectedProducts.forEach(selectedProduct => {
                        const index = products.map(i => i.id).indexOf(selectedProduct.id);
                        products[index].isSelected = true;
                    });
                }
                
                utils.successHandler(products, callback);
            }
        });
    });
};
