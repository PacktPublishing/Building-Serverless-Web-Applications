// Create SimpleDB domains and insert initial data

const uuidv4 = require('uuid/v4');
const AWS = require('aws-sdk');
const simpledb = new AWS.SimpleDB();

const params = { 
    DomainName: 'Products'
}; 

simpledb.createDomain(params, (err, data) => { 
    if (err) return console.log(err, err.stack);

    const generateComment = () => {
        const id1 = uuidv4();
        const id2 = uuidv4();
        return [
            {
                id:   { Name: 'CommentID-1', Value: id1 },
                user: { Name: 'CommentUsername-1', Value: 'John Doe' },
                date: { Name: 'CommentDate-1', Value: '2016-12-24T17:15:10.000Z' },
                text: { Name: 'CommentText-1', Value: `I'm using this to decorate my desk. I liked it.` }
            },
            {
                id:   { Name: 'CommentID-2', Value: id2 },
                user: { Name: 'CommentUsername-2', Value: 'Jane Smith' },
                date: { Name: 'CommentDate-2', Value: '2016-12-24T18:15:10.000Z' },
                text: { Name: 'CommentText-2', Value: 'This product was very well made.' }
            }
        ]
    };


    const comments = [];
    for (let i = 0; i < 9; i++) {
        comments.push(generateComment());
    }

    const s3Bucket = 'https://s3.amazonaws.com/serverless-store-media/product-images/';

    const insertParams = { 
        DomainName: 'Products',
        Items: [
            {
                Attributes: [
                    { Name: 'Name', Value: 'Lonely Bird' },
                    { Name: 'Price', Value: '2999' },
                    { Name: 'Image', Value: s3Bucket + 'lonely-bird.jpg' },
                    comments[0][0].id, comments[0][0].user, comments[0][0].date, comments[0][0].text,
                    comments[0][1].id, comments[0][1].user, comments[0][1].date, comments[0][1].text
                ],
                Name: 'lonely-bird'
            },
            {
                Attributes: [
                    { Name: 'Name', Value: 'Solid Friendship' },
                    { Name: 'Price', Value: '1999' },
                    { Name: 'Image', Value: s3Bucket + 'solid-friendship.jpg' },
                    comments[1][0].id, comments[1][0].user, comments[1][0].date, comments[1][0].text,
                    comments[1][1].id, comments[1][1].user, comments[1][1].date, comments[1][1].text
                ],
                Name: 'solid-friendship'
            },
            {
                Attributes: [
                    { Name: 'Name', Value: 'Thanksgiving' },
                    { Name: 'Price', Value: '3999' },
                    { Name: 'Image', Value: s3Bucket + 'thanksgiving.jpg' },
                    comments[2][0].id, comments[2][0].user, comments[2][0].date, comments[2][0].text,
                    comments[2][1].id, comments[2][1].user, comments[2][1].date, comments[2][1].text
                ],
                Name: 'thanksgiving'
            },
            {
                Attributes: [
                    { Name: 'Name', Value: 'Old Man' },
                    { Name: 'Price', Value: '1999' },
                    { Name: 'Image', Value: s3Bucket + 'old-man.jpg' },
                    comments[3][0].id, comments[3][0].user, comments[3][0].date, comments[3][0].text,
                    comments[3][1].id, comments[3][1].user, comments[3][1].date, comments[3][1].text
                ],
                Name: 'old-man'
            },
            {
                Attributes: [
                    { Name: 'Name', Value: 'Lait Cow' },
                    { Name: 'Price', Value: '5999' },
                    { Name: 'Image', Value: s3Bucket + 'lait-cow.jpg' },
                    comments[4][0].id, comments[4][0].user, comments[4][0].date, comments[4][0].text,
                    comments[4][1].id, comments[4][1].user, comments[4][1].date, comments[4][1].text
                ],
                Name: 'lait-cow'
            },
            {
                Attributes: [
                    { Name: 'Name', Value: 'Chicken' },
                    { Name: 'Price', Value: '2999' },
                    { Name: 'Image', Value: s3Bucket + 'chicken.jpg' },
                    comments[5][0].id, comments[5][0].user, comments[5][0].date, comments[5][0].text,
                    comments[5][1].id, comments[5][1].user, comments[5][1].date, comments[5][1].text
                ],
                Name: 'chicken'
            },
            {
                Attributes: [
                    { Name: 'Name', Value: 'Hare' },
                    { Name: 'Price', Value: '4999' },
                    { Name: 'Image', Value: s3Bucket + 'hare.jpg' },
                    comments[6][0].id, comments[6][0].user, comments[6][0].date, comments[6][0].text,
                    comments[6][1].id, comments[6][1].user, comments[6][1].date, comments[6][1].text
                ],
                Name: 'hare'
            },
            {
                Attributes: [
                    { Name: 'Name', Value: 'Fall' },
                    { Name: 'Price', Value: '1999' },
                    { Name: 'Image', Value: s3Bucket + 'fall.jpg' },
                    comments[7][0].id, comments[7][0].user, comments[7][0].date, comments[7][0].text,
                    comments[7][1].id, comments[7][1].user, comments[7][1].date, comments[7][1].text
                ],
                Name: 'fall'
            },
            {
                Attributes: [
                    { Name: 'Name', Value: 'Gardener' },
                    { Name: 'Price', Value: '3999' },
                    { Name: 'Image', Value: s3Bucket + 'gardener.jpg' },
                    comments[8][0].id, comments[8][0].user, comments[8][0].date, comments[8][0].text,
                    comments[8][1].id, comments[8][1].user, comments[8][1].date, comments[8][1].text
                ],
                Name: 'gardener'
            }
        ]
    }; 

    simpledb.batchPutAttributes(insertParams, (err, data) => { 
        if (err) console.log(err, err.stack); 
        else console.log(data);
    });
});

params.DomainName = 'ShoppingCart';

simpledb.createDomain(params, (err, data) => { 
    if (err) console.log(err, err.stack); 
    else console.log(data);
});