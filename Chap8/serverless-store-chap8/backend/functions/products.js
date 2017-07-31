'use strict';

const products = require('../lib/products');
const checkout = require('../lib/checkout');
const cart = require('../lib/cart');
const utils = require('../lib/utils');

module.exports.handler = (event, context, callback) => {

    try {
        switch(`${event.httpMethod} ${event.resource}`) {
          
            case 'GET /products':      
                products.retrieveAll(callback);
                break;

            case 'PUT /cart':      
                const id = JSON.parse(event.body).id;
                cart.saveCart(id, callback);
                break;

            case 'OPTIONS /cart':      
                utils.optionsHandler(callback);
                break;                  

            case 'POST /checkout':              
                checkout.processCheckout(callback);
                break;
            
            case 'OPTIONS /checkout':      
                utils.optionsHandler(callback);
                break;

            default:
                utils.invalidHandler(callback);
        }
    } catch (err) {
        utils.errorHandler(err, callback);
    }
};
