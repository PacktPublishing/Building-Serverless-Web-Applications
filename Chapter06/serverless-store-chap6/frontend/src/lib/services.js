import axios from 'axios';
import config from './config';

class Services {

    static getProducts(callback) {
        const url = `${config.apiGateway.ADDRESS}/${config.apiGateway.STAGE}/${config.services.PRODUCTS}`;
        axiosRequest('get', url, null, callback);
    }

    static saveCart(selectedProducts, callback) {
        const url = `${config.apiGateway.ADDRESS}/${config.apiGateway.STAGE}/${config.services.CART}`;
        axiosRequest('post', url, { "products": selectedProducts }, callback);
    }

    static processCheckout(callback) {
        const url = `${config.apiGateway.ADDRESS}/${config.apiGateway.STAGE}/${config.services.CHECKOUT}`;
        axiosRequest('put', url, { "id": 1 }, callback);
    }
}

const axiosRequest = (method, url, data, callback) => {

    const config = {
        method: method,
        url: url
    };

    if (data) {
        config.data = data;
        config.headers = { "Content-Type": "application/json" };
    }

    axios(config)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            callback(error);
        });
}


export default Services; 