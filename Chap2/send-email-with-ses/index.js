const AWS = require('aws-sdk');
const ses = new AWS.SES();

const params = {
	Source: 'donotreply@example.com',
	Destination: { ToAddresses: [ 'foo@bar.com' ] },
	Message: {
		Subject: { Data: 'First e-mail' },
		Body: { Text: { Data: 'Hello, World!' } }
	}
};

ses.sendEmail(params, (err, data) => {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data); // successful response
});