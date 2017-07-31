import axios from 'axios';
import config from './config';

import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool
} from 'amazon-cognito-identity-js';

class Services {

    static getProducts(callback) {
        const url = `${config.apiGateway.ADDRESS}/${config.apiGateway.STAGE}/${config.services.PRODUCTS}`;
        axiosRequest('get', url, null, callback);
    }

    static saveCart(callback) {
        const url = `${config.apiGateway.ADDRESS}/${config.apiGateway.STAGE}/${config.services.CART}`;
        axiosRequest('put', url, { "id": 0 }, callback);
    }

    static processCheckout(callback) {
        const url = `${config.apiGateway.ADDRESS}/${config.apiGateway.STAGE}/${config.services.CHECKOUT}`;
        axiosRequest('post', url, null, callback);
    }

    static signup(email, password, callback) {
        const userPool = new CognitoUserPool({
            UserPoolId: config.cognito.USER_POOL_ID,
            ClientId: config.cognito.APP_CLIENT_ID
        });

        const attributeEmail = new CognitoUserAttribute({ 
            Name: 'email', 
            Value: email 
        });

        userPool.signUp(email, password, [attributeEmail], null, callback);
    }

    static confirmSignup(user, confirmationCode, callback) {
        user.confirmRegistration(confirmationCode, true, callback);
    }

    static login(email, password) {
        const userPool = new CognitoUserPool({
            UserPoolId: config.cognito.USER_POOL_ID,
            ClientId: config.cognito.APP_CLIENT_ID
        });

        const user = new CognitoUser({ 
            Username: email, 
            Pool: userPool 
        });

        const authenticationData = {
            Username: email,
            Password: password
        };

        const authDetails = new AuthenticationDetails(authenticationData);

        return new Promise((resolve, reject) => (
            user.authenticateUser(authDetails, {
                onSuccess: (result) => resolve(result.getIdToken().getJwtToken()),
                onFailure: (err) => reject(err)
            })
        ));
    }

    static getUserToken(callback) {
        const userPool = new CognitoUserPool({
            UserPoolId: config.cognito.USER_POOL_ID,
            ClientId: config.cognito.APP_CLIENT_ID
        });

        const currentUser = userPool.getCurrentUser();

        if (currentUser) {
            currentUser.getSession((err, res) => {
                if (err) callback(err);
                else callback(null, res.getIdToken().getJwtToken());
            });
        } else {
            callback(null);
        }
    }

    static logout() {
        const userPool = new CognitoUserPool({
            UserPoolId: config.cognito.USER_POOL_ID,
            ClientId: config.cognito.APP_CLIENT_ID
        });

        const currentUser = userPool.getCurrentUser();

        if (currentUser !== null) {
            currentUser.signOut();
        }
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