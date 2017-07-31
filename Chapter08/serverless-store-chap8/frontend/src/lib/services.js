import axios from 'axios';
import config from './config';

import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool
} from 'amazon-cognito-identity-js';

class Services {

    static getProducts(userToken, callback) {
        let url = `${config.apiGateway.ADDRESS}/${config.apiGateway.STAGE}/${config.services.PRODUCTS}`;

        if (userToken)
            url += 'Auth'; // if user logged in, call a method that will use authentication

        axiosRequest('get', url, null, userToken, callback);
    }

    static saveCart(selectedProducts, userToken, callback) {
        const url = `${config.apiGateway.ADDRESS}/${config.apiGateway.STAGE}/${config.services.CART}`;
        axiosRequest('post', url, { "products": selectedProducts }, userToken, callback);
    }

    static processCheckout(userToken, callback) {
        const url = `${config.apiGateway.ADDRESS}/${config.apiGateway.STAGE}/${config.services.CHECKOUT}`;
        axiosRequest('put', url, { "id": 1 }, userToken, callback);
    }

    static signup(email, password, callback) {
        const userPool = new CognitoUserPool({
            UserPoolId: config.cognito.USER_POOL_ID,
            ClientId: config.cognito.APP_CLIENT_ID
        });

        const attributeEmail = [
            new CognitoUserAttribute({ 
                Name: 'email', 
                Value: email 
            })
        ];

        userPool.signUp(email, password, attributeEmail, null, callback);
    }

    static confirmSignup(newUser, confirmationCode, callback) {
        newUser.confirmRegistration(confirmationCode, true, callback);
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

const axiosRequest = (method, url, data, userToken, callback) => {

    const config = {
        method: method,
        url: url
    };

    if (data || userToken) {

        config.headers = {};

        if (data) {
            config.data = data;
            config.headers["Content-Type"] = "application/json";
        }

        if (userToken) {
            config.headers["Authorization"] = userToken;
        }
    }

    axios(config)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback('You need to be logged in to access this feature.');
        });
}


export default Services; 