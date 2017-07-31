export default {
    "apiGateway": {
        // "ADDRESS": "https://abc123.execute-api.us-east-1.amazonaws.com",
        "ADDRESS": "https://9eowo1j837.execute-api.us-east-1.amazonaws.com",
        "STAGE": "dev"
    },
    "services": {
        "PRODUCTS": "products",
        "CART": "cart",
        "CHECKOUT": "checkout"
    },
    "cognito": {
        // "USER_POOL_ID" : "us-east-1_aBcdeFghi",
        // "APP_CLIENT_ID" : "abcdefghijklmnopqrstuvwxyz",
        // "IDENTITY_POOL_ID": "us-east-1:abcdefghi-1234-5678-9012-abcdefghijkl",
        "USER_POOL_ID" : "us-east-1_wHw1xeEmw",
        "APP_CLIENT_ID" : "1mvfiab7rknv5n9ui588jsva5t",
        "IDENTITY_POOL_ID": "us-east-1:d0b7f77e-58bc-4650-9e7c-2615360dbc64",
        "REGION": "us-east-1"
    },
    "iot": {
        // "ENDPOINT": "abcdefghijklm.iot.us-east-1.amazonaws.com",
        "ENDPOINT": "aghmdogbzjnwu.iot.us-east-1.amazonaws.com",
        "REGION": "us-east-1",
        "topics": {
            "COMMENTS": "serverless-store-comments"
        },
        "POLICY_NAME": "iot-policy"
    }
}