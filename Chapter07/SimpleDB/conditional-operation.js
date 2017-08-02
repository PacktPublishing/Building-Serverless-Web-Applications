const AWS = require('aws-sdk');
const simpledb = new AWS.SimpleDB(); 

// Insert some data first
const insertParams = { 
    DomainName: 'Products',
    Items: [
        {
            Attributes: [
                {
                    Name: 'Counter',
                    Value: '9'
                }              
            ],
            Name: '123'
        }
    ]
}; 

simpledb.batchPutAttributes(insertParams, (err, data) => { 
    if (err) console.log(err, err.stack); 
    else {
        const params = {
            Attributes: [
                {
                    Name: 'Counter',
                    Value: '10', // new value
                    Replace: true
                }
            ],
            DomainName: 'Products',
            ItemName: '123', // identifier
            Expected: {
                Exists: true,
                Name: 'Counter',
                Value: '9' // previous value
            }
        };

        simpledb.putAttributes(params, (err, data) => {
            if (err) console.log(err, err.stack);
            else console.log(data);
        });
    }
});
