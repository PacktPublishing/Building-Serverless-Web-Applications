import AWS from 'aws-sdk';
import axios from 'axios';
import IoT from './iot';
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
        axiosRequest('put', url, { "id": AWS.config.credentials.identityId }, userToken, callback);
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

        if (AWS.config.credentials) {
            AWS.config.credentials.clearCachedId();
        }
    }

    static getIotClient(userToken, messageCallback, callback) {

        AWS.config.region = config.cognito.REGION;

        if (userToken) {
            const authenticator = `cognito-idp.${config.cognito.REGION}.amazonaws.com/${config.cognito.USER_POOL_ID}`;
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: config.cognito.IDENTITY_POOL_ID,
                Logins: {
                    [authenticator]: userToken
                }
            });
        } else {
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: config.cognito.IDENTITY_POOL_ID
            });
        }

        AWS.config.credentials.get(() => {
            const keys = {
                accessKey: AWS.config.credentials.accessKeyId,
                secretKey: AWS.config.credentials.secretAccessKey,
                sessionToken: AWS.config.credentials.sessionToken
            }

            if (userToken) {
                const awsIoT = new AWS.Iot();

                const params = {
                    policyName: config.iot.POLICY_NAME,
                    principal: AWS.config.credentials.identityId
                }

                awsIoT.attachPrincipalPolicy(params, (err, res) => {
                    if (err) alert(err);
                    else {
                        const client = new IoT(keys, messageCallback);
                        client.connect();
                        client.subscribe('serverless-store-' + AWS.config.credentials.identityId);
                        client.subscribe(config.iot.topics.COMMENTS);
                        callback(null, client);
                    }
                });

            } else {
                const client = new IoT(keys, messageCallback);
                client.connect();
                client.subscribe(config.iot.topics.COMMENTS);
                callback(null, client);
            }
        });
    }

    static publishNewComment(iotClient, comment, productId) {
        const topic = config.iot.topics.COMMENTS;
        const message = {
            comment: comment,
            productId: productId
        };

        iotClient.publish(topic, JSON.stringify(message));
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