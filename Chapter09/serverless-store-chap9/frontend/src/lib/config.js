export default {
    "apiGateway": {
        "ADDRESS": "https://abc123.execute-api.us-east-1.amazonaws.com",
        "STAGE": "dev"
    },
    "services": {
        "PRODUCTS": "products",
        "CART": "cart",
        "CHECKOUT": "checkout"
    },
    "cognito": {
        "USER_POOL_ID" : "us-east-1_aBcdeFghi",
        "APP_CLIENT_ID" : "abcdefghijklmnopqrstuvwxyz",
        "IDENTITY_POOL_ID": "us-east-1:abcdefghi-1234-5678-9012-abcdefghijkl",
        "REGION": "us-east-1"
    },
    "iot": {
        "ENDPOINT": "abcdefghijklm.iot.us-east-1.amazonaws.com",        
        "REGION": "us-east-1",
        "topics": {
            "COMMENTS": "serverless-store-comments"
        },
        "POLICY_NAME": "iot-policy"
    }
}