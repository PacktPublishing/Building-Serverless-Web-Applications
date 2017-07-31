const AWS = require('aws-sdk');
const simpledb = new AWS.SimpleDB();

const insertParams = { 
    DomainName: 'Products',
    Items: [
        {
            Attributes: [
                {
                    Name: 'Name',
                    Value: 'Lonely Bird'
                },
                {
                    Name: 'Price',
                    Value: '2999'
                },                
                // more attributes
            ],
            // needs to be unique
            Name: 'lonely-bird'
        },
        // more items
    ]
}; 

simpledb.batchPutAttributes(insertParams, (err, data) => { 
    if (err) console.log(err, err.stack); 
    else console.log(data);
});