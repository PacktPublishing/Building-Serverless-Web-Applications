'use strict';

const products = require('../lib/products');
const checkout = require('../lib/checkout');
const cart = require('../lib/cart');
const utils = require('../lib/utils');

module.exports.handler = (event, context, callback) => {

    let userId = null;

    if (event.requestContext.authorizer)
        userId = event.requestContext.authorizer.claims.sub;

    try {
        switch(`${event.httpMethod} ${event.resource}`) {
          
            case 'GET /products':      
                products.retrieveAll(userId, callback);
                break;

            case 'OPTIONS /products':      
                utils.optionsHandler(callback);
                break;

            case 'PUT /cart':      
                const id = JSON.parse(event.body).id;
                cart.saveCart(id, userId, callback);
                break;

            case 'OPTIONS /cart':      
                utils.optionsHandler(callback);
                break;                  

            case 'POST /checkout':              
                checkout.processCheckout(userId, callback);
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
