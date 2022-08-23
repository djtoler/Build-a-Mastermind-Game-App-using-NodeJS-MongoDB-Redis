const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const dynamoDBHelpers = require('./dynamodb.helpers')
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');

async function getDynamoDBUser () {

    const dynamoDBClient = await new DynamoDBClient(dynamoDBHelpers.dynamoConnectionObject);
    const dynamoDBDocument = DynamoDBDocument.from(dynamoDBClient);

    const res = await dynamoDBDocument.get({
        TableName: 'Games',
        Key: {UserPartitionKey: 'lilmack01@yahoo.com', GameSortKey: 'lilmack8888'},
    });
    
    const item = res.Item;
    console.log(res, '---------------->RES');
    console.log(item, '---------------->ITEM');
}

module.exports = getDynamoDBUser