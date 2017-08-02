import awsIot from 'aws-iot-device-sdk';
import config from './config';

export default class IoT {

    constructor(keys, messageCallback) {
        this.client = null;
        this.accessKey = keys.accessKey;
        this.secretKey = keys.secretKey;
        this.sessionToken = keys.sessionToken;
        this.messageCallback = messageCallback;
        
        this.handleConnect = this.handleConnect.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
    }

    connect() {
        this.client = awsIot.device({
            region: config.iot.REGION,
            host: config.iot.ENDPOINT,            
            accessKeyId: this.accessKey,
            secretKey: this.secretKey,
            sessionToken: this.sessionToken,
            port: 443,
            protocol: 'wss' // WebSocket with TLS
        });

        this.client.on('connect', this.handleConnect);
        this.client.on('message', this.handleMessage);
        this.client.on('close', this.handleClose);
        this.client.on('error', this.handleError);
        this.client.on('reconnect', this.handleReconnect);
        this.client.on('offline', this.handleOffline);
    }

    publish(topic, message) {
        this.client.publish(topic, message);
    }

    subscribe(topic) {
        this.client.subscribe(topic);
    }

    handleConnect() {        
        console.log('Connected to IoT');
    }

    handleMessage(topic, message) {
        this.messageCallback(topic, message);
    }

    handleClose() {
        console.log('IoT: Connection closed');
    }

    handleError() {
        console.log('Error with the IoT connection');
    }

    handleReconnect() {
        console.log('Trying to reconnect to IoT');
    }

    handleOffline() {
        console.log('IoT: Offline');
    }
}
