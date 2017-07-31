AWSCognito.config.region = 'us-east-1'; // or other supported region of your preference
 
var poolData = { 
    UserPoolId : 'us-east-1_abcdefghi',
    ClientId : 'abcdefghijklmnopqrstuvwxyz'
 };

var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);


var email = {
    Name : 'email',
    Value : 'user@domain.com' // retrieve from a form
};

var emailAttr = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(email);

var attributeList = []; 
attributeList.push(attributeEmail);

userPool.signUp('username', 'password', attributeList, null, function(err, result) {
    if (err) console.log(err, err.stack);
    else {
        cognitoUser = result.user;
        console.log('Your user name is: ' + cognitoUser.getUsername());
    }
});


var authData = {
    Username : 'username',
    Password : 'password',
};
 
var authDetails = 
    new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authData);
 
var userData = {
    Username : 'username',
    Pool : userPool
};
 
var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

cognitoUser.authenticateUser(authDetails, {

    onSuccess: function (result) {
        console.log('Access token: ' + result.getAccessToken().getJwtToken());
        console.log('idToken: ' + result.idToken.jwtToken);
    },

    onFailure: function(err) {
        console.log(err, err.stack);
    }
});