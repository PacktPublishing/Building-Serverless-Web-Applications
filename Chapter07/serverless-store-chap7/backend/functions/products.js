'use strict';

const products = require('../lib/products');
const checkout = require('../lib/checkout');
const cart = require('../lib/cart');
const utils = require('../lib/utils');

module.exports.handler = (event, context, callback) => {

    const userId = '1'; // TODO: retrieve from authentication headers

    try {
        switch(`${event.httpMethod} ${event.resource}`) {
          
            case 'GET /products':      
                products.retrieveAll(userId, callback);
                break;

            case 'POST /cart':                
                const selectedProducts = JSON.parse(event.body).products;
                cart.saveCart(userId, selectedProducts, callback);
                break;

            case 'OPTIONS /cart':      
                utils.optionsHandler(callback);
                break;                  

            case 'PUT /checkout':            
                const id = JSON.parse(event.body).id;
                checkout.processCheckout(id, callback);
                break;
            
            case 'OPTIONS /checkout':      
                utils.optionsHandler(callback);
                break;

            default:
                utils.notFoundHandler(callback);
        }
    } catch (err) {
        utils.errorHandler(err, callback);
    }
};
